import { STATUS_CODES } from '@constants/httpStatusCode'
import { AppError } from '@utils/appError'
import type { Request, Response, NextFunction } from 'express'

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`This route ${req.originalUrl} doesn't exist`, STATUS_CODES.NOT_FOUND))
}
