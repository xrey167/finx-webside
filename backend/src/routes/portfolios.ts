import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { ApiResponse, PortfolioData, TradeData } from '../types'

const router = Router()
const prisma = new PrismaClient()

// Validation schemas
const createPortfolioSchema = z.object({
  name: z.string().min(1, 'Portfolio name is required'),
  description: z.string().optional(),
  currency: z.string().length(3, 'Currency must be 3 characters').default('USD'),
})

const createTradeSchema = z.object({
  portfolioId: z.string().optional(),
  symbol: z.string().min(1, 'Symbol is required'),
  type: z.enum(['BUY', 'SELL']),
  quantity: z.number().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
  fees: z.number().min(0, 'Fees cannot be negative').default(0),
  executedAt: z.string().datetime().optional(),
  notes: z.string().optional(),
})

// Get all portfolios for user
router.get('/', async (req: Request, res: Response<ApiResponse<PortfolioData[]>>) => {
  try {
    // TODO: Add authentication middleware to get userId
    const userId = 'demo-user-id' // Placeholder

    const portfolios = await prisma.portfolio.findMany({
      where: { userId },
      include: {
        trades: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        _count: {
          select: { trades: true },
        },
      },
    })

    const portfolioData: PortfolioData[] = portfolios.map(portfolio => ({
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      totalValue: portfolio.totalValue,
      currency: portfolio.currency,
      tradesCount: portfolio._count.trades,
      recentTrades: portfolio.trades.map(trade => ({
        id: trade.id,
        symbol: trade.symbol,
        type: trade.type,
        quantity: trade.quantity,
        price: trade.price,
        fees: trade.fees,
        totalValue: trade.totalValue,
        executedAt: trade.executedAt.toISOString(),
        notes: trade.notes,
        createdAt: trade.createdAt.toISOString(),
      })),
      createdAt: portfolio.createdAt.toISOString(),
      updatedAt: portfolio.updatedAt.toISOString(),
    }))

    res.json({
      success: true,
      data: portfolioData,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    throw error
  }
})

// Create new portfolio
router.post('/', async (req: Request, res: Response<ApiResponse<PortfolioData>>) => {
  try {
    const userId = 'demo-user-id' // Placeholder
    const { name, description, currency } = createPortfolioSchema.parse(req.body)

    const portfolio = await prisma.portfolio.create({
      data: {
        userId,
        name,
        description,
        currency,
      },
      include: {
        _count: {
          select: { trades: true },
        },
      },
    })

    const portfolioData: PortfolioData = {
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      totalValue: portfolio.totalValue,
      currency: portfolio.currency,
      tradesCount: portfolio._count.trades,
      recentTrades: [],
      createdAt: portfolio.createdAt.toISOString(),
      updatedAt: portfolio.updatedAt.toISOString(),
    }

    res.status(201).json({
      success: true,
      data: portfolioData,
      message: 'Portfolio created successfully',
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

// Get portfolio by ID
router.get('/:id', async (req: Request, res: Response<ApiResponse<PortfolioData>>) => {
  try {
    const userId = 'demo-user-id' // Placeholder
    const { id } = req.params

    const portfolio = await prisma.portfolio.findFirst({
      where: { id, userId },
      include: {
        trades: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { trades: true },
        },
      },
    })

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found',
        timestamp: new Date().toISOString()
      })
    }

    const portfolioData: PortfolioData = {
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      totalValue: portfolio.totalValue,
      currency: portfolio.currency,
      tradesCount: portfolio._count.trades,
      recentTrades: portfolio.trades.map(trade => ({
        id: trade.id,
        symbol: trade.symbol,
        type: trade.type,
        quantity: trade.quantity,
        price: trade.price,
        fees: trade.fees,
        totalValue: trade.totalValue,
        executedAt: trade.executedAt.toISOString(),
        notes: trade.notes,
        createdAt: trade.createdAt.toISOString(),
      })),
      createdAt: portfolio.createdAt.toISOString(),
      updatedAt: portfolio.updatedAt.toISOString(),
    }

    res.json({
      success: true,
      data: portfolioData,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    throw error
  }
})

// Add trade to portfolio
router.post('/:id/trades', async (req: Request, res: Response<ApiResponse<TradeData>>) => {
  try {
    const userId = 'demo-user-id' // Placeholder
    const { id: portfolioId } = req.params
    const tradeData = createTradeSchema.parse(req.body)

    // Verify portfolio ownership
    const portfolio = await prisma.portfolio.findFirst({
      where: { id: portfolioId, userId },
    })

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found',
        timestamp: new Date().toISOString()
      })
    }

    const totalValue = tradeData.quantity * tradeData.price + tradeData.fees

    const trade = await prisma.trade.create({
      data: {
        userId,
        portfolioId,
        symbol: tradeData.symbol.toUpperCase(),
        type: tradeData.type,
        quantity: tradeData.quantity,
        price: tradeData.price,
        fees: tradeData.fees,
        totalValue,
        executedAt: tradeData.executedAt ? new Date(tradeData.executedAt) : new Date(),
        notes: tradeData.notes,
      },
    })

    const responseData: TradeData = {
      id: trade.id,
      symbol: trade.symbol,
      type: trade.type,
      quantity: trade.quantity,
      price: trade.price,
      fees: trade.fees,
      totalValue: trade.totalValue,
      executedAt: trade.executedAt.toISOString(),
      notes: trade.notes,
      createdAt: trade.createdAt.toISOString(),
    }

    res.status(201).json({
      success: true,
      data: responseData,
      message: 'Trade added successfully',
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