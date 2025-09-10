import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { example } from './modules/example';
import { logger } from './plugins/logger';

const app = new Elysia()
  .use(logger)
  .use(example)
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Template API',
          version: '1.0.0',
        },
      },
    })
  )
  .listen(5117);

// biome-ignore lint/suspicious/noConsole: Intentionally logging to console
console.log(
  `Template API Server is running at http://${app.server?.hostname}:${app.server?.port}`
);
