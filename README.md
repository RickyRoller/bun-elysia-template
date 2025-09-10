# Bun + Elysia Template API

Production-ready starter powered by Bun and Elysia with Swagger docs, structured logging, and Biome code quality.

## Features

- Bun runtime with fast dev reload (`bun --hot`)
- Elysia web framework
- OpenAPI/Swagger via `@elysiajs/swagger`
- Structured logging via `@bogeychan/elysia-logger` + `pino-pretty`
- Biome formatter/linter and Ultracite defaults
- Type-safe env configuration scaffold with Zod

## Requirements

- Bun v1.1+ installed (`curl -fsSL https://bun.sh/install | bash`)

## Quick Start

```bash
bun install
bun --hot ./index.ts
```

- Server listens on: `http://localhost:5117`
- Swagger UI: `http://localhost:5117/swagger`
- OpenAPI JSON: `http://localhost:5117/swagger/json`

> Tip: Use `--hot` for autoreload during development.

## Project Structure

```text
/ (repo root)
├─ index.ts                 # Elysia app bootstrap (port 5117, Swagger)
├─ config/
│  └─ env.ts               # Zod-validated env schema (extend as needed)
├─ modules/
│  └─ example/        # Example feature module scaffold
│     ├─ index.ts
│     ├─ models.ts
│     └─ service.ts
├─ plugins/
│  └─ logger.ts            # Pretty logger plugin (pino-pretty)
├─ biome.jsonc             # Biome config
├─ tsconfig.json           # TypeScript config
└─ package.json
```

## Scripts (optional)

This template runs directly with Bun. If you prefer scripts, add these to `package.json`:

```json
{
  "scripts": {
    "dev": "bun --hot ./index.ts",
    "start": "bun ./index.ts",
    "lint": "bunx ultracite lint",
    "format": "bunx ultracite format"
  }
}
```

Then run:

```bash
bun run dev
```

## Logging

Logging is enabled via `@bogeychan/elysia-logger` with `pino-pretty` transport for colorized, human-friendly output. See `plugins/logger.ts` for options.

## API Docs

Swagger is enabled via `@elysiajs/swagger` with a basic `info` document. By default this exposes:

- UI: `GET /swagger`
- Spec: `GET /swagger/json`

Adjust options in `index.ts` under the `.use(swagger(...))` call.

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

- Format & auto-fix: `bunx ultracite format`
- Lint only: `bunx ultracite lint`

Biome enforces strict, fast formatting and linting out of the box.

## Development Notes

- Edit `index.ts` to register routes, groups, and plugins.
- Use feature folders under `modules/` to organize domain logic.
- Prefer Elysia plugins for cross-cutting concerns (logging, auth, etc.).

## Troubleshooting

- Port already in use: change the listener port in `index.ts` or via an env var and schema.
- Type errors: ensure you have TypeScript ^5 installed (peer dep) and Bun types (`bun-types`) are present.

## License

MIT
