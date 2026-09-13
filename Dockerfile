# syntax=docker/dockerfile:1.7

# ---- install: full dependency tree, cached across builds -------------------
FROM oven/bun:1.4 AS dependencies
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

# `db migrate` is advisory here: a schema that is already current, or a
# database that is briefly down, must not stop the dev server from booting.
CMD ["sh", "-c", "bunx prisma contract emit && (bunx prisma db migrate --advance-ref db || echo '[dev] migrate skipped'); exec bunx nuxt dev --host 0.0.0.0 --port 3000"]

# ---- migrate-cli: isolated tree for `prisma db migrate` --------------------
# Nitro bundles every runtime dependency (including the generated Prisma
# client) into .output, so the only thing the runtime image still needs from
# npm is the migrate CLI plus the Mongo target adapter it drives. Installing
# it standalone keeps that far smaller than shipping the 1.2GB dev tree.
FROM oven/bun:1.4 AS migrate-cli
WORKDIR /migrate

ENV BUN_CONFIG_MAX_HTTP_REQUESTS=8

# Versions kept in step with package.json's dependencies/devDependencies.
RUN --mount=type=cache,target=/root/.bun/install/cache,sharing=locked \
  echo '{"name":"migrate","private":true}' > package.json \
  && bun add --ignore-scripts prisma@8.0.0-rc.14 @prisma/orm-mongo@8.0.0-rc.11 dotenv@17.4.2

# ---- build ----------------------------------------------------------------
FROM dependencies AS build
WORKDIR /app

# prisma.config.ts resolves MONGODB_URL eagerly. Neither `contract emit` nor
# the Nuxt build talks to a database, so a placeholder satisfies it; the real
# URL is injected at runtime by compose.
ENV MONGODB_URL=mongodb://placeholder:placeholder@localhost:27017/placeholder

# Contract first: `prisma contract emit` then only re-runs when it changes.
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN bunx prisma contract emit

COPY . .
RUN --mount=type=cache,target=/app/node_modules/.cache,sharing=locked \
  bunx nuxt build

# ---- runtime --------------------------------------------------------------
FROM oven/bun:1.4-slim AS runtime
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
# `db migrate --advance-ref db` is the Prisma 8 Mongo equivalent of the old
# `migrate deploy` — applies pending migrations and advances the `db` ref.
CMD ["sh", "-c", "bun node_modules/prisma/build/index.js db migrate --advance-ref db && bun run .output/server/index.mjs"]
