import { Elysia } from 'elysia';
import { logger } from '../../plugins/logger';
import type { ExampleEchoBody } from './models.ts';
import {
  exampleEchoBody,
  exampleEchoResponse,
  examplePingResponse,
} from './models.ts';
import { echo } from './service.ts';

/**
 * Example router demonstrating method chaining for strong, incremental type-safety.
 *
 * Keep chaining on the same `Elysia` instance so plugins, schemas, and context
 * flow through subsequent routes. This ensures fully inferred handler types.
 *
 * Per best practices: 1 Elysia instance = 1 controller. Treat this instance
 * as the controller itself; avoid separate controller classes.
 *
 * Example pattern (expanded):
 * new Elysia({ prefix: '/api/v1/example' })
 *   .use(logger)
 *   .post('/post', ...) // body/response validated via `t`
 *   .get('/get', ...);
 *
 * Best practices: https://elysiajs.com/essential/best-practice
 */
export const example = new Elysia({ prefix: '/api/v1/example' })
  .use(logger)
  .post(
    '/post',
    ({ body }: { body: ExampleEchoBody }) => {
      const { message } = body;
      return echo(message);
    },
    {
      body: exampleEchoBody,
      response: exampleEchoResponse,
    }
  )
  .get('/get', () => ({ ok: true }), {
    response: examplePingResponse,
  });
