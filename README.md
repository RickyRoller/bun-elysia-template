# Bun + Elysia Template API

Production-ready starter powered by Bun and Elysia with OpenAPI docs (Scalar), structured logging, and Ultracite code quality (Oxc formatter/linter).

## Features

- Bun runtime with fast dev reload (`bun --hot`)
- Elysia web framework with feature modules and Elysia `t` schemas
- OpenAPI via `@elysiajs/openapi` with `fromTypes()` for schema references
- Structured logging via `@bogeychan/elysia-logger` + `pino-pretty`
- Oxc formatter/linter (`oxfmt`, `oxlint`) and Ultracite defaults
- Type-safe env configuration scaffold with Zod

## Requirements

- Bun v1.1+ installed (`curl -fsSL https://bun.sh/install | bash`)
- TypeScript ^6 (peer dependency)

## Quick Start

```bash
bun install
bun --hot ./index.ts
```

- Server listens on: `http://localhost:5117`
- Scalar UI: `http://localhost:5117/openapi`
- OpenAPI JSON: `http://localhost:5117/openapi/json`
- Example routes: `GET /api/v1/example/get`, `POST /api/v1/example/post`

> Tip: Use `--hot` for autoreload during development.

## Project Structure

```text
/ (repo root)
├─ index.ts                 # Elysia app bootstrap (port 5117, OpenAPI)
├─ config/
│  └─ env.ts               # Zod-validated env schema (extend as needed)
├─ modules/
│  └─ example/             # Example feature module scaffold
│     ├─ index.ts          # Routes (1 Elysia instance = 1 controller)
│     ├─ models.ts         # Shared Elysia `t` schemas via `.model()`
│     └─ service.ts        # Business logic separated from handlers
├─ plugins/
│  └─ logger.ts            # Pretty logger plugin (pino-pretty)
├─ oxfmt.config.ts         # Oxc formatter config (extends Ultracite)
├─ oxlint.config.ts        # Oxc linter config (extends Ultracite)
├─ tsconfig.json           # TypeScript config
└─ package.json
```

## Scripts

```bash
bun run check   # Lint and format check (ultracite check)
bun run fix     # Auto-fix lint and format issues (ultracite fix)
```

For development without scripts:

```bash
bun --hot ./index.ts   # dev with hot reload
bun ./index.ts         # production run
```

## Logging

Logging is enabled via `@bogeychan/elysia-logger` with `pino-pretty` transport for colorized, human-friendly output. See `plugins/logger.ts` for options.

## API Docs

OpenAPI is enabled via `@elysiajs/openapi` with `fromTypes()` so route schemas flow into the spec. By default this exposes:

- UI: `GET /openapi`
- Spec: `GET /openapi/json`

Adjust options in `index.ts` under the `.use(openapi(...))` call.

## Environment Variables

Bun loads `.env` automatically; no `dotenv` needed. Validate and access env in `config/env.ts` using Zod. Example of extending the schema:

```ts
// config/env.ts
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(5117),
});

export const env = envSchema.parse(process.env);
```

Then in `index.ts` use `env.PORT` for the listener port.

## Code Quality

Ultracite wraps Oxc tooling:

- Check: `bun run check` (or `bunx ultracite check`)
- Fix: `bun run fix` (or `bunx ultracite fix`)

Config lives in `oxfmt.config.ts` and `oxlint.config.ts`, both extending Ultracite presets.

## Development Notes

- Edit `index.ts` to register routes, groups, and plugins.
- Use feature folders under `modules/` to organize domain logic.
- Define shared request/response schemas in `models.ts` with Elysia `.model()` and reference them by key in route options.
- Keep handlers thin; delegate to `service.ts` functions.
- Prefer Elysia plugins for cross-cutting concerns (logging, auth, etc.).

## Troubleshooting

- Port already in use: change the listener port in `index.ts` or via an env var and schema.
- Type errors: ensure TypeScript ^6 is installed (peer dep) and Bun types (`bun-types`) are present.

## License

MIT
