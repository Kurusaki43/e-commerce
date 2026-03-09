import pino from 'pino'

import env from './env'

const logger = pino({
  level: env.LOG_LEVEL || 'info',
  base: {
    env: env.NODE_ENV,
  },
  transport: !env.isProd
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
})

export default logger
