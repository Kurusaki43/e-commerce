import type { Response } from 'express'

export const successResponse = (
  res: Response,
  data: unknown,
  message = 'Success',
  statusCode = 200,
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
