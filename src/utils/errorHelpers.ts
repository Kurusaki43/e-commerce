import type { Response } from 'express'
import { STATUS_CODES } from '@constants/httpStatusCode'

import type { AppError } from './appError'

export const sendErrorDev = (res: Response, error: AppError) =>
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    name: error.name,
    error: error,
  })

export const sendErrorProd = (res: Response, error: AppError) => {
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    })
  }
  //   if (isZodError(error)) {
  //     return handleZodError(error, res)
  //   }
  //   if (isCastError(error)) {
  //     return handleCastError(error, res)
  //   }

  //   if (isValidationError(error)) {
  //     return handleValidationError(error, res)
  //   }

  //   if (isDuplicateKeyError(error)) {
  //     return handleDuplicateKeyError(error, res)
  //   }
  //   if (isMulterError(error)) {
  //     return handleMulterError(error, res)
  //   }

  // Fallback for unknown/unhandled errors
  return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Something went very wrong!',
  })
}
