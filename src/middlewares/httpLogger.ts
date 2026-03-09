import logger from '@config/logger'
import pinoHttp from 'pino-http'

export const httpLogger = pinoHttp({
  logger,
})
