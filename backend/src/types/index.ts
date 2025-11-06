// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
}

// JWT Payload
export interface JWTPayload {
  userId: string
  email: string
  type: 'access' | 'refresh'
}

// Extended Request type for authenticated routes
import { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string
    email: string
  }
}

// Market Data types
export interface MarketQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap?: string
  high24h?: number
  low24h?: number
  timestamp: string
  source: string
}

// Portfolio types
export interface PortfolioData {
  id: string
  name: string
  description?: string
  totalValue: number
  currency: string
  tradesCount: number
  recentTrades: TradeData[]
  createdAt: string
  updatedAt: string
}

export interface TradeData {
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  quantity: number
  price: number
  fees: number
  totalValue: number
  executedAt: string
  notes?: string
  createdAt: string
}

// User types
export interface UserData {
  id: string
  email: string
  firstName?: string
  lastName?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

// Authentication types
export interface TokenPair {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

// Economic Indicator types
export interface EconomicIndicatorData {
  id: number
  country: string
  countryCode: string
  indicator: string
  value: number
  unit: string
  period: string
  timestamp: string
  source: string
}

// WebSocket Event types
export interface SocketEvent {
  type: string
  data: unknown
  timestamp: string
}

export interface MarketSubscription {
  symbols: string[]
}

export interface PortfolioSubscription {
  portfolioId: string
}

// External API types
export interface AlphaVantageQuote {
  '01. symbol': string
  '02. open': string
  '03. high': string
  '04. low': string
  '05. price': string
  '06. volume': string
  '07. latest trading day': string
  '08. previous close': string
  '09. change': string
  '10. change percent': string
}

export interface CoinGeckoPrice {
  usd: number
  usd_24h_change?: number
  usd_market_cap?: number
  usd_24h_vol?: number
}