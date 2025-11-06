import { Request, Response } from 'express'
import { ApiResponse } from '../types'

export const notFound = (req: Request, res: Response<ApiResponse<never>>) => {
  const response: ApiResponse<never> = {
    success: false,
    error: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  }

  res.status(404).json(response)
}