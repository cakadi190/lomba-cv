# Cak Adi Personal CV
Merupakan sebuah CV versi web yang bisa diunduh oleh siapa saja.

## Local development

Install dependencies and start the local data services:

```bash
bun install
docker compose up -d postgres redis
```

Copy `.env.example` to `.env` if local environment variables have not already
been configured, then migrate the `cakadi_cv` database and run Nuxt:

```bash
bun run db:migrate
bun run dev
```

PostgreSQL is available at `127.0.0.1:5432` and Redis at
`127.0.0.1:6379`.

## Full Docker stack

```bash
bun run docker:up
```

The app, PostgreSQL, and Redis share the dual-stack `cakadi-cv-bridge` network:

- IPv4 subnet: `172.27.0.0/16`
- IPv6 subnet: `fd2a:1c3e:9b56::/64`

Inside the network, the app connects to `postgres:5432` and `redis:6379`.
The application is served at `http://localhost:3000`.
