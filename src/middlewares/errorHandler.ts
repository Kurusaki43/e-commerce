import env from '@config/env'
import { STATUS_CODES } from '@constants/httpStatusCode'
import type { AppError } from '@utils/appError'
import { sendErrorDev, sendErrorProd } from '@utils/errorHelpers'
import type { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  const error = { ...err }
  error.message = err.message
  error.status = err.status || 'error'
  error.statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR

  if (env.isDev) {
    sendErrorDev(res, error)
  } else {
    sendErrorProd(res, error)
  }
}
