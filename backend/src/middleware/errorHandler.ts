import { Request, Response, NextFunction } from 'express'
import { ApiResponse } from '../types'

export const errorHandler = (
  error: any,
  req: Request,
  res: Response<ApiResponse<never>>,
  next: NextFunction
) => {
  console.error('Error occurred:', error)

  // Default error
  let statusCode = 500
  let message = 'Internal Server Error'

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400
    message = error.message
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token'
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Token expired'
  } else if (error.code === 'P2002') {
    // Prisma unique constraint error
    statusCode = 409
    message = 'Resource already exists'
  } else if (error.code === 'P2025') {
    // Prisma record not found
    statusCode = 404
    message = 'Resource not found'
  } else if (error.message) {
    message = error.message
  }

  const response: ApiResponse<never> = {
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  }

  res.status(statusCode).json(response)
}