# syntax=docker/dockerfile:1.7

# ---- install: full dependency tree, cached across builds -------------------
FROM oven/bun:1.3.10 AS dependencies
WORKDIR /app

ENV NUXT_TELEMETRY_DISABLED=1
# Large binary tarballs (prisma, biome, sass-embedded, pglite) get truncated
# when bun fans out its default 256 parallel requests; that surfaces as
# "Integrity check failed for tarball". Throttling keeps the downloads intact.
ENV BUN_CONFIG_MAX_HTTP_REQUESTS=8

COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache,sharing=locked \
  bun install --frozen-lockfile --ignore-scripts

# ---- dev: nuxt dev server, source bind-mounted from the host ---------------
# Nothing is copied in: compose.override.yaml mounts the working tree over
# /app so edits are live. node_modules stays a named volume, seeded from the
# `dependencies` layer above, so the container keeps its own Linux-native
# binaries instead of inheriting the host's.
FROM dependencies AS dev
WORKDIR /app

# Prisma engines need OpenSSL.
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt,sharing=locked \
  apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates

ENV NODE_ENV=development
EXPOSE 3000

# `migrate deploy` is advisory here: a schema that is already current, or a
# database that is briefly down, must not stop the dev server from booting.
CMD ["sh", "-c", "bunx prisma generate && (bunx prisma migrate deploy || echo '[dev] migrate skipped'); exec bunx nuxt dev --host 0.0.0.0 --port 3000"]

# ---- migrate-cli: isolated tree for `prisma migrate deploy` ----------------
# Nitro bundles every runtime dependency (including the generated Prisma
# client) into .output, so the only thing the runtime image still needs from
# npm is the migrate CLI. Installing it standalone keeps that at ~250MB
# instead of shipping the 1.2GB dev tree.
FROM oven/bun:1.3.10 AS migrate-cli
WORKDIR /migrate

ENV BUN_CONFIG_MAX_HTTP_REQUESTS=8

# Versions kept in step with package.json's devDependencies.
RUN --mount=type=cache,target=/root/.bun/install/cache,sharing=locked \
  echo '{"name":"migrate","private":true}' > package.json \
  && bun add --ignore-scripts prisma@7.9.0 dotenv@17.4.2

# ---- build ----------------------------------------------------------------
FROM dependencies AS build
WORKDIR /app

# prisma.config.ts resolves DATABASE_URL eagerly. Neither `generate` nor the
# Nuxt build talks to a database, so a placeholder satisfies it; the real URL
# is injected at runtime by compose.
ENV DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder

# Schema first: `prisma generate` then only re-runs when the schema changes.
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN bunx prisma generate

COPY . .
RUN --mount=type=cache,target=/app/node_modules/.cache,sharing=locked \
  bunx nuxt build

# ---- runtime --------------------------------------------------------------
FROM oven/bun:1.3.10-slim AS runtime
WORKDIR /app

# Prisma engines need OpenSSL; TLS-backed services need the CA bundle.
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt,sharing=locked \
  apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=migrate-cli /migrate/node_modules ./node_modules
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json /app/prisma.config.ts ./
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

# Invoke the CLI by path: `bunx prisma` treats the local install as a miss and
# re-resolves the whole tree from npm on every container start.
#
# Migrations need a session-mode connection (Supabase port 5432); the app
# itself is fine on the transaction pooler (6543). MIGRATE_DATABASE_URL
# overrides the URL for the migrate step only.
CMD ["sh", "-c", "DATABASE_URL=\"${MIGRATE_DATABASE_URL:-$DATABASE_URL}\" bun node_modules/prisma/build/index.js migrate deploy && bun run .output/server/index.mjs"]
