import { logger as loggerPlugin } from '@bogeychan/elysia-logger';
import Elysia from 'elysia';

export const logger = new Elysia({ name: 'app.logger' }).use(
  loggerPlugin({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
      },
    },
  })
);
