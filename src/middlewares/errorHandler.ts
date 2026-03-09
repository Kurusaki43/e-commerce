import { STATUS_CODES } from '@constants/httpStatusCode'
import { AppError } from '@utils/appError'
import type { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR
  let message = 'Internal Server Error'

  if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
