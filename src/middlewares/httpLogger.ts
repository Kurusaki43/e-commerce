import crypto from 'crypto'

import pinoHttp from 'pino-http'
import logger from '@config/logger'

export const httpLogger = pinoHttp({
  logger,

  genReqId: (req) => {
    const existingId = req.headers['x-request-id']
    return typeof existingId === 'string' ? existingId : crypto.randomUUID()
  },

  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) return 'error'
    if (res.statusCode >= 400) return 'warn'
    return 'info'
  },

  customSuccessMessage: (req, _res) => {
    return `${req.method} ${req.url} completed`
  },

  customErrorMessage: (req, _res, err) => {
    return `${req.method} ${req.url} failed: ${err?.message ?? 'unknown error'}`
  },

  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params,
      }
    },

    res(res) {
      return {
        statusCode: res.statusCode,
      }
    },

    err(err) {
      return {
        type: err.name,
        message: err.message,
        stack: err.stack,
      }
    },
  },

  customProps: (req) => {
    return {
      requestId: req.id,
    }
  },

  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password',
      'req.body.token',
    ],
    censor: '[REDACTED]',
  },
})
