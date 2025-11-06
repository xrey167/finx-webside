# FinX Backend Droid – Complete Mission Briefing

## 🎯 Mission Overview
You are the **Backend Droid** building the server infrastructure for **FinX**—a trading and portfolio management platform delivering market data, portfolio operations, real-time features, trading utilities, market statistics, and economic insights.

## 🏢 Working Environment
- **Repository**: https://github.com/xrey167/finx-webside
- **Branch**: `feature/backend-api`
- **Directory**: `/backend/`
- **Collaboration**: Frontend Droid works in parallel within `/frontend/`
- **Product Overview**: [docs/project-overview.md](./project-overview.md)
- **Phase 1 Focus**: Follow [Phase 1 Implementation Plan](./phase1-implementation-plan.md) – Epics E2/E3/E4/E5, branch `feature/backend-options-suite`
- **Backlog**: See [phase1-backlog.md](./phase1-backlog.md) for sprint tasks and dependencies

## 🔄 Git Workflow
- `git fetch --all --prune`
- `git checkout feature/backend-api`
- `git pull --rebase origin feature/backend-api`
- Install dependencies via `npm install` and regenerate Prisma client with `npx prisma generate`
- Use conventional commits (e.g. `feat(api): ...`), rebase before pushing
- Validate with `npm run lint` and `npm run build`; ensure a clean `git status` before `git push origin feature/backend-api`

## 🚧 Scope Snapshot
- **Endpoints**: `/api/auth`, `/api/portfolios`, `/api/market`
- **Stack**: Node.js, Express, PostgreSQL, Prisma, Redis, Socket.io
- **Timeline**: 2–3 weeks

## 📋 Phase 1: Core Infrastructure (Week 1)

### 1.1 Node.js + TypeScript Project Setup
```bash
# Navigate to the repository root, then create backend directory
mkdir backend
cd backend

# Initialize Node.js project
npm init -y

# Install core dependencies
npm install express cors helmet morgan dotenv compression
npm install typescript @types/node @types/express @types/cors @types/morgan
npm install -D nodemon ts-node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint

# Install database dependencies
npm install prisma @prisma/client
npm install -D prisma-dbml-generator

# Install authentication dependencies
npm install jsonwebtoken bcryptjs
npm install @types/jsonwebtoken @types/bcryptjs

# Install additional dependencies
npm install zod express-rate-limit express-validator
npm install socket.io redis ioredis
npm install @types/redis
npm install winston express-winston
```

### 1.2 TypeScript Configuration

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": false,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```
### 1.3 Package.json Scripts

Update `package.json`:
```json
{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/app.js",
    "dev": "nodemon --exec ts-node src/app.ts",
    "db:generate": "npx prisma generate",
    "db:push": "npx prisma db push",
    "db:migrate": "npx prisma migrate dev",
    "db:seed": "ts-node prisma/seed.ts",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```
### 1.4 Environment Variables Setup

Create `.env` file (with example values):
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/finx_dev"
REDIS_URL="redis://localhost:6379"

# JWT Secrets
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-minimum-32-characters-long"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="30d"

# Server Configuration
PORT=8000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"

# External APIs
ALPHA_VANTAGE_API_KEY="your_alpha_vantage_api_key"
COINGECKO_API_KEY="your_coingecko_api_key"
POLYGON_API_KEY="your_polygon_api_key"
FRED_API_KEY="your_fred_api_key"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL="info"
```

---

## 📋 Phase 2: Database Schema & Authentication (Week 1-2)

### 2.1 Prisma Database Schema

Initialize Prisma:
```bash
npx prisma init
```

Create `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

generator dbml {
  provider = "prisma-dbml-generator"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String   @map("password_hash")
  firstName    String?  @map("first_name")
  lastName     String?  @map("last_name")
  isVerified   Boolean  @default(false) @map("is_verified")
  isActive     Boolean  @default(true) @map("is_active")
  lastLoginAt  DateTime? @map("last_login_at")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  // Relations
  portfolios    Portfolio[]
  refreshTokens RefreshToken[]
  trades        Trade[]

  @@map("users")
}

model RefreshToken {
  id        String   @id @default(cuid())
  userId    String   @map("user_id")
  token     String   @unique
  expiresAt DateTime @map("expires_at")
  isRevoked Boolean  @default(false) @map("is_revoked")
  createdAt DateTime @default(now()) @map("created_at")

  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([token])
  @@map("refresh_tokens")
}

model Portfolio {
  id          String   @id @default(cuid())
  userId      String   @map("user_id")
  name        String
  description String?
  totalValue  Decimal  @default(0) @map("total_value") @db.Decimal(15, 2)
  currency    String   @default("USD")
  isActive    Boolean  @default(true) @map("is_active")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // Relations
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  trades Trade[]

  @@index([userId])
  @@map("portfolios")
}

model Trade {
  id          String    @id @default(cuid())
  userId      String    @map("user_id")
  portfolioId String    @map("portfolio_id")
  symbol      String
  type        TradeType
  quantity    Decimal   @db.Decimal(15, 8)
  price       Decimal   @db.Decimal(15, 2)
  fees        Decimal   @default(0) @db.Decimal(15, 2)
  totalValue  Decimal   @map("total_value") @db.Decimal(15, 2)
  executedAt  DateTime  @map("executed_at")
  notes       String?
  createdAt   DateTime  @default(now()) @map("created_at")

  // Relations
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  portfolio Portfolio @relation(fields: [portfolioId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([portfolioId])
  @@index([symbol])
  @@index([executedAt])
  @@map("trades")
}

model MarketData {
  id            Int      @id @default(autoincrement())
  symbol        String
  name          String
  price         Decimal  @db.Decimal(15, 2)
  change        Decimal  @db.Decimal(15, 2)
  changePercent Decimal  @db.Decimal(8, 4) @map("change_percent")
  volume        BigInt
  marketCap     BigInt?  @map("market_cap")
  high24h       Decimal? @map("high_24h") @db.Decimal(15, 2)
  low24h        Decimal? @map("low_24h") @db.Decimal(15, 2)
  timestamp     DateTime
  source        String
  createdAt     DateTime @default(now()) @map("created_at")

  @@unique([symbol, timestamp, source])
  @@index([symbol])
  @@index([timestamp])
  @@index([source])
  @@map("market_data")
}

model EconomicIndicator {
  id          Int      @id @default(autoincrement())
  country     String
  countryCode String   @map("country_code")
  indicator   String
  value       Decimal  @db.Decimal(10, 4)
  unit        String
  period      String
  timestamp   DateTime
  source      String
  createdAt   DateTime @default(now()) @map("created_at")

  @@unique([countryCode, indicator, period, source])
  @@index([countryCode])
  @@index([indicator])
  @@index([timestamp])
  @@map("economic_indicators")
}

enum TradeType {
  BUY
  SELL
}
```

### 2.2 Database Migrations & Seeding

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@finx.com' },
    update: {},
    create: {
      email: 'demo@finx.com',
      passwordHash: hashedPassword,
      firstName: 'Demo',
      lastName: 'User',
      isVerified: true,
    },
  })

  // Create demo portfolio
  const portfolio = await prisma.portfolio.upsert({
    where: { id: 'demo-portfolio-1' },
    update: {},
    create: {
      id: 'demo-portfolio-1',
      userId: user.id,
      name: 'My Trading Portfolio',
      description: 'Demo portfolio for testing',
      totalValue: 25674.89,
      currency: 'USD',
    },
  })

  // Create demo trades
  const trades = [
    {
      symbol: 'AAPL',
      type: 'BUY' as const,
      quantity: 10,
      price: 175.50,
      fees: 1.99,
      executedAt: new Date('2024-01-15'),
    },
    {
      symbol: 'TSLA',
      type: 'BUY' as const,
      quantity: 5,
      price: 242.80,
      fees: 1.99,
      executedAt: new Date('2024-01-20'),
    },
    {
      symbol: 'MSFT',
      type: 'BUY' as const,
      quantity: 8,
      price: 384.30,
      fees: 1.99,
      executedAt: new Date('2024-01-25'),
    },
  ]

  for (const trade of trades) {
    const totalValue = trade.quantity * trade.price + trade.fees
    await prisma.trade.create({
      data: {
        ...trade,
        userId: user.id,
        portfolioId: portfolio.id,
        totalValue,
      },
    })
  }

  // Sample market data
  const marketData = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 178.25,
      change: 2.75,
      changePercent: 1.57,
      volume: BigInt(52847392),
      marketCap: BigInt(2786000000000),
      timestamp: new Date(),
      source: 'alpha_vantage',
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 248.50,
      change: -4.30,
      changePercent: -1.70,
      volume: BigInt(89472651),
      marketCap: BigInt(787000000000),
      timestamp: new Date(),
      source: 'alpha_vantage',
    },
  ]

  for (const data of marketData) {
    await prisma.marketData.create({ data })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### 2.3 Authentication Service

Create `src/services/auth.service.ts`:
```typescript
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface JWTPayload {
  userId: string
  email: string
  type: 'access' | 'refresh'
}

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
      { expiresIn: this.jwtExpiresIn }
    )
  }

  generateRefreshToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email, type: 'refresh' },
      this.jwtRefreshSecret,
      { expiresIn: this.jwtRefreshExpiresIn }
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
}
```

---

## 📋 Phase 3: Core API Endpoints (Week 2)

### 3.1 Authentication Controllers

Create `src/controllers/auth.controller.ts`:
```typescript
import { Request, Response } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { AuthService } from '../services/auth.service'
import { ApiResponse } from '../types'

const prisma = new PrismaClient()
const authService = new AuthService()

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
})

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = registerSchema.parse(req.body)

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'User with this email already exists',
          timestamp: new Date().toISOString(),
        } as ApiResponse<null>)
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

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      })

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isVerified: user.isVerified,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          },
          tokens,
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse<any>)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          message: error.errors[0]?.message,
          timestamp: new Date().toISOString(),
        } as ApiResponse<null>)
      }

      console.error('Registration error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      } as ApiResponse<null>)
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body)

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials',
          timestamp: new Date().toISOString(),
        } as ApiResponse<null>)
      }

      // Verify password
      const isPasswordValid = await authService.verifyPassword(password, user.passwordHash)
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials',
          timestamp: new Date().toISOString(),
        } as ApiResponse<null>)
      }

      // Generate tokens
      const tokens = await authService.generateTokens(user.id, user.email)

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      })

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isVerified: user.isVerified,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          },
          tokens,
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse<any>)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          message: error.errors[0]?.message,
          timestamp: new Date().toISOString(),
        } as ApiResponse<null>)
      }

      console.error('Login error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      } as ApiResponse<null>)
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = refreshTokenSchema.parse(req.body)

      // Verify refresh token
      const payload = authService.verifyRefreshToken(refreshToken)
      const isValid = await authService.isRefreshTokenValid(refreshToken)

      if (!isValid) {
        return res.status(401).json({
          success: false,
          error: 'Invalid refresh token',
          timestamp: new Date().toISOString(),
        } as ApiResponse<null>)
      }

      // Generate new tokens
      const tokens = await authService.generateTokens(payload.userId, payload.email)

      // Revoke old refresh token
      await authService.revokeRefreshToken(refreshToken)

      res.json({
        success: true,
        data: { tokens },
        timestamp: new Date().toISOString(),
      } as ApiResponse<any>)
    } catch (error) {
      console.error('Refresh token error:', error)
      res.status(401).json({
        success: false,
        error: 'Invalid refresh token',
        timestamp: new Date().toISOString(),
      } as ApiResponse<null>)
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body

      if (refreshToken) {
        await authService.revokeRefreshToken(refreshToken)
      }

      res.json({
        success: true,
        data: { message: 'Logged out successfully' },
        timestamp: new Date().toISOString(),
      } as ApiResponse<any>)
    } catch (error) {
      console.error('Logout error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      } as ApiResponse<null>)
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.userId

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          isVerified: true,
          lastLoginAt: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
          timestamp: new Date().toISOString(),
        } as ApiResponse<null>)
      }

      res.json({
        success: true,
        data: {
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
          lastLoginAt: user.lastLoginAt?.toISOString(),
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse<any>)
    } catch (error) {
      console.error('Get profile error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      } as ApiResponse<null>)
    }
  }
}
```

### 3.2 Portfolio Management

Create `src/controllers/portfolio.controller.ts`:
```typescript
import { Request, Response } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { ApiResponse } from '../types'

const prisma = new PrismaClient()

const createPortfolioSchema = z.object({
  name: z.string().min(1, 'Portfolio name is required'),
  description: z.string().optional(),
  currency: z.string().default('USD'),
})

const createTradeSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required'),
  type: z.enum(['BUY', 'SELL']),
  quantity: z.number().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
  fees: z.number().min(0, 'Fees cannot be negative').optional().default(0),
  executedAt: z.string().datetime(),
  notes: z.string().optional(),
})

export class PortfolioController {
  async getPortfolios(req: Request, res: Response) {
    try {
      const userId = req.user?.userId

      const portfolios = await prisma.portfolio.findMany({
        where: { userId, isActive: true },
        include: {
          trades: {
            orderBy: { executedAt: 'desc' },
            take: 5, // Last 5 trades
          },
          _count: {
            select: { trades: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      const formattedPortfolios = portfolios.map(portfolio => ({
        id: portfolio.id,
        name: portfolio.name,
        description: portfolio.description,
        totalValue: parseFloat(portfolio.totalValue.toString()),
        currency: portfolio.currency,
        tradesCount: portfolio._count.trades,
        recentTrades: portfolio.trades.map(trade => ({
          id: trade.id,
          symbol: trade.symbol,
          type: trade.type,
          quantity: parseFloat(trade.quantity.toString()),
          price: parseFloat(trade.price.toString()),
          totalValue: parseFloat(trade.totalValue.toString()),
          executedAt: trade.executedAt.toISOString(),
        })),
        createdAt: portfolio.createdAt.toISOString(),
        updatedAt: portfolio.updatedAt.toISOString(),
      }))

      res.json({
        success: true,
        data: formattedPortfolios,
        timestamp: new Date().toISOString(),
      } as ApiResponse<any>)
    } catch (error) {
      console.error('Get portfolios error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      } as ApiResponse<null>)
    }
  }

  async createPortfolio(req: Request, res: Response) {
    try {
      const userId = req.user?.userId
      const { name, description, currency } = createPortfolioSchema.parse(req.body)

      const portfolio = await prisma.portfolio.create({
        data: {
          userId,
          name,
          description,
          currency,
        },
      })

      res.status(201).json({
        success: true,
        data: {
          id: portfolio.id,
          name: portfolio.name,
          description: portfolio.description,
          totalValue: parseFloat(portfolio.totalValue.toString()),
          currency: portfolio.currency,
          createdAt: portfolio.createdAt.toISOString(),
          updatedAt: portfolio.updatedAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse<any>)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          message: error.errors[0]?.message,
          timestamp: new Date().toISOString(),
        } as ApiResponse<null>)
      }

      console.error('Create portfolio error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      } as ApiResponse<null>)
    }
  }

  async addTrade(req: Request, res: Response) {
    try {
      const userId = req.user?.userId
      const { portfolioId } = req.params
      const { symbol, type, quantity, price, fees, executedAt, notes } = createTradeSchema.parse(req.body)

      // Verify portfolio ownership
      const portfolio = await prisma.portfolio.findFirst({
        where: { id: portfolioId, userId },
      })

      if (!portfolio) {
        return res.status(404).json({
          success: false,
          error: 'Portfolio not found',
          timestamp: new Date().toISOString(),
        } as ApiResponse<null>)
      }

      const totalValue = quantity * price + fees

      const trade = await prisma.trade.create({
        data: {
          userId,
          portfolioId,
          symbol: symbol.toUpperCase(),
          type,
          quantity,
          price,
          fees,
          totalValue,
          executedAt: new Date(executedAt),
          notes,
        },
      })

      // Update portfolio total value (simplified calculation)
      const allTrades = await prisma.trade.findMany({
        where: { portfolioId },
      })

      const newTotalValue = allTrades.reduce((total, t) => {
        const tradeValue = parseFloat(t.totalValue.toString())
        return t.type === 'BUY' ? total + tradeValue : total - tradeValue
      }, 0)

      await prisma.portfolio.update({
        where: { id: portfolioId },
        data: { totalValue: newTotalValue },
      })

      res.status(201).json({
        success: true,
        data: {
          id: trade.id,
          symbol: trade.symbol,
          type: trade.type,
          quantity: parseFloat(trade.quantity.toString()),
          price: parseFloat(trade.price.toString()),
          fees: parseFloat(trade.fees.toString()),
          totalValue: parseFloat(trade.totalValue.toString()),
          executedAt: trade.executedAt.toISOString(),
          notes: trade.notes,
          createdAt: trade.createdAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse<any>)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          message: error.errors[0]?.message,
          timestamp: new Date().toISOString(),
        } as ApiResponse<null>)
      }

      console.error('Add trade error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      } as ApiResponse<null>)
    }
  }
}
```

---

## 📋 Phase 4: External APIs & Real-time Features (Week 3)

### 4.1 Market Data Service

Create `src/services/marketData.service.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class MarketDataService {
  private alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY!
  private coinGeckoApiKey = process.env.COINGECKO_API_KEY

  async getQuote(symbol: string) {
    try {
      // First check cache (database)
      const cached = await prisma.marketData.findFirst({
        where: {
          symbol: symbol.toUpperCase(),
          timestamp: {
            gte: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          },
        },
        orderBy: { timestamp: 'desc' },
      })

      if (cached) {
        return {
          symbol: cached.symbol,
          name: cached.name,
          price: parseFloat(cached.price.toString()),
          change: parseFloat(cached.change.toString()),
          changePercent: parseFloat(cached.changePercent.toString()),
          volume: cached.volume.toString(),
          marketCap: cached.marketCap?.toString(),
          timestamp: cached.timestamp.toISOString(),
          source: cached.source,
        }
      }

      // Fetch from Alpha Vantage API
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.alphaVantageApiKey}`
      )

      if (!response.ok) {
        throw new Error(`Alpha Vantage API error: ${response.status}`)
      }

      const data = await response.json()
      const quote = data['Global Quote']

      if (!quote) {
        throw new Error('Invalid symbol or API limit reached')
      }

      const marketData = {
        symbol: quote['01. symbol'],
        name: quote['01. symbol'], // Alpha Vantage doesn't provide company name in this endpoint
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: BigInt(quote['06. volume']),
        timestamp: new Date(),
        source: 'alpha_vantage',
      }

      // Cache in database
      await prisma.marketData.create({
        data: {
          ...marketData,
          marketCap: null, // Not available in this endpoint
        },
      })

      return {
        ...marketData,
        volume: marketData.volume.toString(),
        timestamp: marketData.timestamp.toISOString(),
      }
    } catch (error) {
      console.error('Get quote error:', error)
      throw new Error('Failed to fetch market data')
    }
  }

  async getCryptoPrices(symbols: string[]) {
    try {
      const symbolsStr = symbols.join(',')
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbolsStr}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`

      const response = await fetch(url, {
        headers: this.coinGeckoApiKey ? {
          'X-CG-Demo-API-Key': this.coinGeckoApiKey
        } : {}
      })

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`)
      }

      const data = await response.json()

      const results = Object.entries(data).map(([id, info]: [string, any]) => ({
        symbol: id.toUpperCase(),
        name: id,
        price: info.usd,
        change: info.usd_24h_change || 0,
        changePercent: info.usd_24h_change || 0,
        volume: info.usd_24h_vol || 0,
        marketCap: info.usd_market_cap || 0,
        timestamp: new Date().toISOString(),
        source: 'coingecko',
      }))

      // Cache results
      for (const result of results) {
        await prisma.marketData.create({
          data: {
            symbol: result.symbol,
            name: result.name,
            price: result.price,
            change: result.change,
            changePercent: result.changePercent,
            volume: BigInt(Math.floor(result.volume)),
            marketCap: BigInt(Math.floor(result.marketCap)),
            timestamp: new Date(),
            source: result.source,
          },
        })
      }

      return results
    } catch (error) {
      console.error('Get crypto prices error:', error)
      throw new Error('Failed to fetch crypto data')
    }
  }

  async searchSymbols(query: string) {
    try {
      // Search in cached data first
      const results = await prisma.marketData.findMany({
        where: {
          OR: [
            { symbol: { contains: query.toUpperCase() } },
            { name: { contains: query, mode: 'insensitive' } },
          ],
        },
        distinct: ['symbol'],
        take: 10,
        orderBy: { timestamp: 'desc' },
      })

      return results.map(item => ({
        symbol: item.symbol,
        name: item.name,
        price: parseFloat(item.price.toString()),
        source: item.source,
      }))
    } catch (error) {
      console.error('Search symbols error:', error)
      throw new Error('Failed to search symbols')
    }
  }
}
```

### 4.2 WebSocket Server

Create `src/websocket/socketHandlers.ts`:
```typescript
import { Server } from 'socket.io'
import { MarketDataService } from '../services/marketData.service'

const marketDataService = new MarketDataService()

export function setupWebSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    // Handle market data subscription
    socket.on('subscribe:market', async (symbols: string[]) => {
      console.log('Client subscribing to market data:', symbols)
      
      for (const symbol of symbols) {
        socket.join(`market:${symbol.toUpperCase()}`)
      }
      
      // Send initial data
      try {
        for (const symbol of symbols) {
          const quote = await marketDataService.getQuote(symbol)
          socket.emit('market:data', quote)
        }
      } catch (error) {
        socket.emit('market:error', { error: 'Failed to fetch market data' })
      }
    })

    // Handle portfolio subscription
    socket.on('subscribe:portfolio', (portfolioId: string) => {
      console.log('Client subscribing to portfolio:', portfolioId)
      socket.join(`portfolio:${portfolioId}`)
    })

    // Handle unsubscribe
    socket.on('unsubscribe:market', (symbols: string[]) => {
      for (const symbol of symbols) {
        socket.leave(`market:${symbol.toUpperCase()}`)
      }
    })

    socket.on('unsubscribe:portfolio', (portfolioId: string) => {
      socket.leave(`portfolio:${portfolioId}`)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })

  // Broadcast market data updates every 30 seconds
  setInterval(async () => {
    try {
      const popularSymbols = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN']
      
      for (const symbol of popularSymbols) {
        try {
          const quote = await marketDataService.getQuote(symbol)
          io.to(`market:${symbol}`).emit('market:update', quote)
        } catch (error) {
          console.error(`Failed to update ${symbol}:`, error)
        }
      }
    } catch (error) {
      console.error('Market data broadcast error:', error)
    }
  }, 30000) // 30 seconds
}
```

---

## ✅ Definition of Done

### **API Endpoints:**
- [ ] **Authentication**: Register, login, refresh token, logout, profile endpoints
- [ ] **Portfolio Management**: CRUD operations for portfolios and trades
- [ ] **Market Data**: Real-time quotes, search, trending symbols
- [ ] **Economic Data**: Country indicators for world maps
- [ ] **Input Validation**: Zod schemas for all endpoints
- [ ] **Error Handling**: Consistent error responses with proper HTTP codes
- [ ] **Rate Limiting**: Implemented on all public endpoints

### **Database:**
- [ ] **Schema**: Complete Prisma schema with proper relations
- [ ] **Migrations**: Database migrations working correctly
- [ ] **Indexes**: Performance indexes on frequently queried fields
- [ ] **Constraints**: Foreign keys and unique constraints properly set
- [ ] **Seed Data**: Sample data for development and testing

### **Authentication & Security:**
- [ ] **JWT**: Access and refresh token implementation
- [ ] **Password Hashing**: bcrypt with proper salt rounds
- [ ] **Token Management**: Refresh token rotation and revocation
- [ ] **Protected Routes**: Middleware for authenticated endpoints
- [ ] **Rate Limiting**: Express rate limiter configured
- [ ] **CORS**: Properly configured for frontend domain

### **External APIs:**
- [ ] **Alpha Vantage**: Stock market data integration
- [ ] **CoinGecko**: Cryptocurrency data integration
- [ ] **FRED**: Economic indicators integration (optional)
- [ ] **Error Handling**: Graceful handling of API failures
- [ ] **Caching**: Redis or database caching for API responses
- [ ] **Rate Limiting**: Respect external API rate limits

### **Real-time Features:**
- [ ] **WebSocket Server**: Socket.io implementation
- [ ] **Market Data Streaming**: Real-time price updates
- [ ] **Portfolio Updates**: Live portfolio value changes
- [ ] **Connection Management**: Proper connect/disconnect handling
- [ ] **Room Management**: Symbol and portfolio subscriptions

### **Code Quality:**
- [ ] **TypeScript**: Strict TypeScript without any types
- [ ] **Error Handling**: Try-catch blocks and proper error responses
- [ ] **Logging**: Winston logger for debugging and monitoring
- [ ] **Environment**: Proper environment variable management
- [ ] **File Structure**: Organized controllers, services, middleware
- [ ] **API Documentation**: OpenAPI/Swagger documentation (optional)

### **Performance & Monitoring:**
- [ ] **Database Queries**: Optimized with proper indexes
- [ ] **Response Times**: Fast response times (< 200ms for simple queries)
- [ ] **Memory Usage**: No memory leaks in long-running processes
- [ ] **Error Logging**: Comprehensive error logging
- [ ] **Health Check**: API health check endpoint

### **Testing & Documentation:**
- [ ] **Manual Testing**: All endpoints tested with Postman/curl
- [ ] **Error Cases**: All error scenarios tested
- [ ] **Edge Cases**: Boundary conditions tested
- [ ] **Documentation**: API endpoint documentation
- [ ] **Environment Setup**: Clear setup instructions

---

## 🚀 Success Criteria

**After completion, you will have delivered:**

1. ✅ **Complete REST API** with authentication and business logic
2. ✅ **JWT Authentication System** with refresh token management
3. ✅ **PostgreSQL Database** with optimized schema and relationships
4. ✅ **Market Data Integration** from Alpha Vantage and CoinGecko
5. ✅ **Portfolio Management System** with trade tracking
6. ✅ **WebSocket Server** for real-time market data streaming
7. ✅ **Redis Caching** for performance optimization
8. ✅ **Rate Limiting & Security** middleware implementation
9. ✅ **Error Handling & Logging** system
10. ✅ **Economic Data APIs** for world map features

**Timeline**: 2-3 weeks
**Next Phase**: Advanced analytics, chart data APIs, and mobile API optimization

---

## 📞 Communication & Support

- **Daily commits**: Document API changes and progress
- **Pull requests**: Create PR when major features are complete
- **Conventional commits**: Use `feat:`, `fix:`, `docs:`, `perf:` prefixes
- **API Documentation**: Update shared types in `../shared/types/api.ts`
- **Testing**: Test all endpoints thoroughly before submitting
- **Updates**: Provide weekly status updates on development progress


🚀 **Ready to build a robust trading platform backend!**