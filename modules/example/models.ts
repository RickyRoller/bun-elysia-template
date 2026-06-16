import { Elysia, t } from "elysia";

export const ExampleModelKeys = {
  echoBody: "example.echo.body",
  echoResponse: "example.echo.response",
  pingResponse: "example.ping.response",
} as const;

const exampleEchoBodySchema = t.Object({
  message: t.String({ minLength: 1 }),
});

const exampleEchoResponseSchema = t.Object({
  echoed: t.String(),
});

const examplePingResponseSchema = t.Object({
  ok: t.Boolean(),
});

export const exampleModel = new Elysia({ name: "Example.Model" }).model({
  [ExampleModelKeys.echoBody]: exampleEchoBodySchema,
  [ExampleModelKeys.echoResponse]: exampleEchoResponseSchema,
  [ExampleModelKeys.pingResponse]: examplePingResponseSchema,
});
