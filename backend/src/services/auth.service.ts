import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { JWTPayload } from '../types'

const prisma = new PrismaClient()

export class AuthService {
  private jwtSecret = process.env.JWT_SECRET!
  private jwtRefreshSecret = process.env.JWT_REFRESH_SECRET!
  private jwtExpiresIn = process.env.JWT_EXPIRES_IN || '15m'
  private jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '30d'

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  generateAccessToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email, type: 'access' },
      this.jwtSecret,
      { expiresIn: this.jwtExpiresIn } as any
    )
  }

  generateRefreshToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email, type: 'refresh' },
      this.jwtRefreshSecret,
      { expiresIn: this.jwtRefreshExpiresIn } as any
    )
  }

  async generateTokens(userId: string, email: string) {
    const accessToken = this.generateAccessToken(userId, email)
    const refreshToken = this.generateRefreshToken(userId, email)

    // Store refresh token in database
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30) // 30 days

    await prisma.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt,
      },
    })

    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60, // 15 minutes in seconds
    }
  }

  verifyAccessToken(token: string): JWTPayload {
    return jwt.verify(token, this.jwtSecret) as JWTPayload
  }

  verifyRefreshToken(token: string): JWTPayload {
    return jwt.verify(token, this.jwtRefreshSecret) as JWTPayload
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { token },
      data: { isRevoked: true },
    })
  }

  async isRefreshTokenValid(token: string): Promise<boolean> {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { token },
    })

    if (!refreshToken || refreshToken.isRevoked || refreshToken.expiresAt < new Date()) {
      return false
    }

    return true
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true },
    })
  }

  async cleanupExpiredTokens(): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { isRevoked: true }
        ]
      }
    })
  }
}