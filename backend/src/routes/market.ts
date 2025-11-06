import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { ApiResponse, MarketQuote, EconomicIndicatorData } from '../types'

const router = Router()
const prisma = new PrismaClient()

// Validation schemas
const symbolsSchema = z.object({
  symbols: z.array(z.string().min(1)).min(1, 'At least one symbol is required'),
})

const countrySchema = z.object({
  countryCode: z.string().length(2, 'Country code must be 2 characters'),
})

// Get market quotes for symbols
router.get('/quotes', async (req: Request, res: Response<ApiResponse<MarketQuote[]>>) => {
  try {
    const symbols = req.query.symbols as string
    if (!symbols) {
      return res.status(400).json({
        success: false,
        error: 'Symbols query parameter is required',
        timestamp: new Date().toISOString()
      })
    }

    const symbolArray = symbols.split(',').map(s => s.trim().toUpperCase())

    const marketData = await prisma.marketData.findMany({
      where: {
        symbol: { in: symbolArray },
      },
      orderBy: { timestamp: 'desc' },
      distinct: ['symbol'],
    })

    const quotes: MarketQuote[] = marketData.map(data => ({
      symbol: data.symbol,
      name: data.name,
      price: data.price,
      change: data.change,
      changePercent: data.changePercent,
      volume: data.volume.toString(),
      marketCap: data.marketCap?.toString(),
      high24h: data.high24h,
      low24h: data.low24h,
      timestamp: data.timestamp.toISOString(),
      source: data.source,
    }))

    res.json({
      success: true,
      data: quotes,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    throw error
  }
})

// Get single market quote
router.get('/quote/:symbol', async (req: Request, res: Response<ApiResponse<MarketQuote>>) => {
  try {
    const { symbol } = req.params
    const normalizedSymbol = symbol.toUpperCase()

    const marketData = await prisma.marketData.findFirst({
      where: { symbol: normalizedSymbol },
      orderBy: { timestamp: 'desc' },
    })

    if (!marketData) {
      return res.status(404).json({
        success: false,
        error: 'Market data not found for symbol',
        timestamp: new Date().toISOString()
      })
    }

    const quote: MarketQuote = {
      symbol: marketData.symbol,
      name: marketData.name,
      price: marketData.price,
      change: marketData.change,
      changePercent: marketData.changePercent,
      volume: marketData.volume.toString(),
      marketCap: marketData.marketCap?.toString(),
      high24h: marketData.high24h,
      low24h: marketData.low24h,
      timestamp: marketData.timestamp.toISOString(),
      source: marketData.source,
    }

    res.json({
      success: true,
      data: quote,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    throw error
  }
})

// Get all available market symbols
router.get('/symbols', async (req: Request, res: Response<ApiResponse<string[]>>) => {
  try {
    const symbols = await prisma.marketData.findMany({
      select: { symbol: true },
      distinct: ['symbol'],
      orderBy: { symbol: 'asc' },
    })

    const symbolList = symbols.map(s => s.symbol)

    res.json({
      success: true,
      data: symbolList,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    throw error
  }
})

// Get economic indicators
router.get('/economic-indicators', async (req: Request, res: Response<ApiResponse<EconomicIndicatorData[]>>) => {
  try {
    const { countryCode, indicator } = req.query

    const where: any = {}
    if (countryCode) {
      where.countryCode = (countryCode as string).toUpperCase()
    }
    if (indicator) {
      where.indicator = indicator as string
    }

    const indicators = await prisma.economicIndicator.findMany({
      where,
      orderBy: [
        { countryCode: 'asc' },
        { indicator: 'asc' },
        { timestamp: 'desc' },
      ],
    })

    const indicatorData: EconomicIndicatorData[] = indicators.map(indicator => ({
      id: indicator.id,
      country: indicator.country,
      countryCode: indicator.countryCode,
      indicator: indicator.indicator,
      value: indicator.value,
      unit: indicator.unit,
      period: indicator.period,
      timestamp: indicator.timestamp.toISOString(),
      source: indicator.source,
    }))

    res.json({
      success: true,
      data: indicatorData,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    throw error
  }
})

// Get economic indicators by country
router.get('/economic-indicators/:countryCode', async (req: Request, res: Response<ApiResponse<EconomicIndicatorData[]>>) => {
  try {
    const { countryCode } = req.params
    const normalizedCountryCode = countryCode.toUpperCase()

    const indicators = await prisma.economicIndicator.findMany({
      where: { countryCode: normalizedCountryCode },
      orderBy: [
        { indicator: 'asc' },
        { timestamp: 'desc' },
      ],
    })

    const indicatorData: EconomicIndicatorData[] = indicators.map(indicator => ({
      id: indicator.id,
      country: indicator.country,
      countryCode: indicator.countryCode,
      indicator: indicator.indicator,
      value: indicator.value,
      unit: indicator.unit,
      period: indicator.period,
      timestamp: indicator.timestamp.toISOString(),
      source: indicator.source,
    }))

    res.json({
      success: true,
      data: indicatorData,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    throw error
  }
})

// Search market data
router.get('/search', async (req: Request, res: Response<ApiResponse<MarketQuote[]>>) => {
  try {
    const { q } = req.query
    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Search query parameter "q" is required',
        timestamp: new Date().toISOString()
      })
    }

    const searchTerm = q.toUpperCase()

    const marketData = await prisma.marketData.findMany({
      where: {
        OR: [
          { symbol: { contains: searchTerm } },
          { name: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      orderBy: [
        { symbol: 'asc' },
        { timestamp: 'desc' },
      ],
      distinct: ['symbol'],
      take: 20,
    })

    const quotes: MarketQuote[] = marketData.map(data => ({
      symbol: data.symbol,
      name: data.name,
      price: data.price,
      change: data.change,
      changePercent: data.changePercent,
      volume: data.volume.toString(),
      marketCap: data.marketCap?.toString(),
      high24h: data.high24h,
      low24h: data.low24h,
      timestamp: data.timestamp.toISOString(),
      source: data.source,
    }))

    res.json({
      success: true,
      data: quotes,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    throw error
  }
})

export default router