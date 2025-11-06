import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { AuthService } from '../services/auth.service'
import { ApiResponse, UserData, TokenPair } from '../types'

const router = Router()
const prisma = new PrismaClient()
const authService = new AuthService()

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
})

// Register endpoint
router.post('/register', async (req: Request, res: Response<ApiResponse<{ user: UserData; tokens: TokenPair }>>) => {
  try {
    const { email, password, firstName, lastName } = registerSchema.parse(req.body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User already exists with this email',
        timestamp: new Date().toISOString()
      })
    }

    // Hash password and create user
    const passwordHash = await authService.hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
      },
    })

    // Generate tokens
    const tokens = await authService.generateTokens(user.id, user.email)

    const userData: UserData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      lastLoginAt: user.lastLoginAt?.toISOString(),
    }

    res.status(201).json({
      success: true,
      data: { user: userData, tokens },
      message: 'User registered successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues.map(issue => issue.message).join(', '),
        timestamp: new Date().toISOString()
      })
    }
    throw error
  }
})

// Login endpoint
router.post('/login', async (req: Request, res: Response<ApiResponse<{ user: UserData; tokens: TokenPair }>>) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    // Find user
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
        timestamp: new Date().toISOString()
      })
    }

    // Verify password
    const isValidPassword = await authService.verifyPassword(password, user.passwordHash)
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
        timestamp: new Date().toISOString()
      })
    }

    // Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    // Generate tokens
    const tokens = await authService.generateTokens(user.id, user.email)

    const userData: UserData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      lastLoginAt: new Date().toISOString(),
    }

    res.json({
      success: true,
      data: { user: userData, tokens },
      message: 'Login successful',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues.map(issue => issue.message).join(', '),
        timestamp: new Date().toISOString()
      })
    }
    throw error
  }
})

// Refresh token endpoint
router.post('/refresh', async (req: Request, res: Response<ApiResponse<TokenPair>>) => {
  try {
    const { refreshToken } = refreshTokenSchema.parse(req.body)

    // Verify refresh token
    const payload = authService.verifyRefreshToken(refreshToken)
    const isValid = await authService.isRefreshTokenValid(refreshToken)

    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired refresh token',
        timestamp: new Date().toISOString()
      })
    }

    // Revoke old refresh token
    await authService.revokeRefreshToken(refreshToken)

    // Generate new tokens
    const tokens = await authService.generateTokens(payload.userId, payload.email)

    res.json({
      success: true,
      data: tokens,
      message: 'Tokens refreshed successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues.map(issue => issue.message).join(', '),
        timestamp: new Date().toISOString()
      })
    }
    return res.status(401).json({
      success: false,
      error: 'Invalid refresh token',
      timestamp: new Date().toISOString()
    })
  }
})

// Logout endpoint
router.post('/logout', async (req: Request, res: Response<ApiResponse<null>>) => {
  try {
    const { refreshToken } = refreshTokenSchema.parse(req.body)

    await authService.revokeRefreshToken(refreshToken)

    res.json({
      success: true,
      data: null,
      message: 'Logged out successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues.map(issue => issue.message).join(', '),
        timestamp: new Date().toISOString()
      })
    }
    throw error
  }
})

export default router