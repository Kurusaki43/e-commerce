import crypto from 'crypto'

import pinoHttp from 'pino-http'
import logger from '@config/logger'

export const httpLogger = pinoHttp({
  logger,

  genReqId: (req) => {
    return req.headers['x-request-id'] || crypto.randomUUID()
  },

  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error'
    if (res.statusCode >= 400) return 'warn'
    return 'info'
  },

  customSuccessMessage: (req, _res) => {
    return `${req.method} ${req.url} completed`
  },

  customErrorMessage: (req, _res, _err) => {
    return `${req.method} ${req.url} failed`
  },
})
