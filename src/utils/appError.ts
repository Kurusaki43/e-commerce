export class AppError extends Error {
  public status: string
  public isOperational: boolean
  public statusCode: number
  constructor(message: string, codeStatus: number) {
    super(message)
    this.status = `${codeStatus}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true
    this.statusCode = codeStatus
    Error.captureStackTrace(this, this.constructor)
  }
}
