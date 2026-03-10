import type { Response } from 'express'

export const successResponse = (
  res: Response,
  statusCode = 200,
  message = 'Success',
  data?: unknown,
) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  })
}

export const errorResponse = (res: Response, message: string, statusCode = 500) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
  })
}
