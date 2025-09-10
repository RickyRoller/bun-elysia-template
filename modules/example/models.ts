import { t } from 'elysia';

/**
 * Example validation schemas using Elysia's `t` helper.
 *
 * Define request/response shapes with `t.*` builders to get:
 * - Runtime validation for incoming data
 * - Static TypeScript types via `typeof schema.static`
 *
 * Per best practices: use `t` schemas (DTOs) as the single source
 * of truth for both runtime validation and static typing via `.static`.
 */

// Request body for POST /post
export const exampleEchoBody = t.Object({
  message: t.String({ minLength: 1 }),
});
export type ExampleEchoBody = typeof exampleEchoBody.static;

// Response for POST /post
export const exampleEchoResponse = t.Object({
  echoed: t.String(),
});
export type ExampleEchoResponse = typeof exampleEchoResponse.static;

// Response for GET /get
export const examplePingResponse = t.Object({
  ok: t.Boolean(),
});
export type ExamplePingResponse = typeof examplePingResponse.static;
