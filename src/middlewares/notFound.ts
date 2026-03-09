import { STATUS_CODES } from '@constants/httpStatusCode'
import { AppError } from '@utils/appError'
import type { Request, Response, NextFunction } from 'express'

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError('Route not found', STATUS_CODES.NOT_FOUND))
}
