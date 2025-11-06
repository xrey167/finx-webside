import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

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

  console.log('✅ Demo user created:', user.email)

  // Create demo portfolio
  const portfolio = await prisma.portfolio.upsert({
    where: { id: 'demo-portfolio-1' },
    update: {},
    create: {
      id: 'demo-portfolio-1',
      userId: user.id,
      name: 'My Trading Portfolio',
      description: 'Demo portfolio for testing the FinX platform',
      totalValue: 25674.89,
      currency: 'USD',
    },
  })

  console.log('✅ Demo portfolio created:', portfolio.name)

  // Create demo trades
  const trades = [
    {
      symbol: 'AAPL',
      type: 'BUY' as const,
      quantity: 10,
      price: 175.50,
      fees: 1.99,
      executedAt: new Date('2024-01-15'),
      notes: 'Initial Apple investment'
    },
    {
      symbol: 'TSLA',
      type: 'BUY' as const,
      quantity: 5,
      price: 242.80,
      fees: 1.99,
      executedAt: new Date('2024-01-20'),
      notes: 'Tesla long-term hold'
    },
    {
      symbol: 'MSFT',
      type: 'BUY' as const,
      quantity: 8,
      price: 384.30,
      fees: 1.99,
      executedAt: new Date('2024-01-25'),
      notes: 'Microsoft dividend play'
    },
    {
      symbol: 'AAPL',
      type: 'SELL' as const,
      quantity: 2,
      price: 180.25,
      fees: 1.99,
      executedAt: new Date('2024-02-10'),
      notes: 'Taking some profits'
    },
    {
      symbol: 'GOOGL',
      type: 'BUY' as const,
      quantity: 3,
      price: 142.65,
      fees: 1.99,
      executedAt: new Date('2024-02-15'),
      notes: 'Google on the dip'
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

  console.log(`✅ ${trades.length} demo trades created`)

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
      high24h: 180.50,
      low24h: 175.20,
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
      high24h: 252.80,
      low24h: 246.10,
      timestamp: new Date(),
      source: 'alpha_vantage',
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 388.75,
      change: 5.45,
      changePercent: 1.42,
      volume: BigInt(23846721),
      marketCap: BigInt(2890000000000),
      high24h: 390.25,
      low24h: 383.30,
      timestamp: new Date(),
      source: 'alpha_vantage',
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 145.80,
      change: 1.15,
      changePercent: 0.80,
      volume: BigInt(34567892),
      marketCap: BigInt(1850000000000),
      high24h: 146.95,
      low24h: 144.65,
      timestamp: new Date(),
      source: 'alpha_vantage',
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 43250.75,
      change: 850.25,
      changePercent: 2.01,
      volume: BigInt(28476539000),
      marketCap: BigInt(847000000000),
      high24h: 43580.00,
      low24h: 42100.50,
      timestamp: new Date(),
      source: 'coingecko',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2485.60,
      change: -45.30,
      changePercent: -1.79,
      volume: BigInt(15234567000),
      marketCap: BigInt(298000000000),
      high24h: 2530.80,
      low24h: 2450.20,
      timestamp: new Date(),
      source: 'coingecko',
    }
  ]

  for (const data of marketData) {
    await prisma.marketData.create({ data })
  }

  console.log(`✅ ${marketData.length} market data entries created`)

  // Sample economic indicators
  const economicIndicators = [
    {
      country: 'United States',
      countryCode: 'US',
      indicator: 'GDP_GROWTH',
      value: 2.4,
      unit: 'percent',
      period: '2024-Q1',
      timestamp: new Date('2024-04-30'),
      source: 'FRED'
    },
    {
      country: 'United States',
      countryCode: 'US',
      indicator: 'UNEMPLOYMENT_RATE',
      value: 3.7,
      unit: 'percent',
      period: '2024-04',
      timestamp: new Date('2024-05-03'),
      source: 'FRED'
    },
    {
      country: 'United States',
      countryCode: 'US',
      indicator: 'INFLATION_RATE',
      value: 3.2,
      unit: 'percent',
      period: '2024-04',
      timestamp: new Date('2024-05-15'),
      source: 'FRED'
    },
    {
      country: 'Germany',
      countryCode: 'DE',
      indicator: 'GDP_GROWTH',
      value: 0.8,
      unit: 'percent',
      period: '2024-Q1',
      timestamp: new Date('2024-05-01'),
      source: 'EUROSTAT'
    },
    {
      country: 'Japan',
      countryCode: 'JP',
      indicator: 'GDP_GROWTH',
      value: 1.2,
      unit: 'percent',
      period: '2024-Q1',
      timestamp: new Date('2024-05-20'),
      source: 'CABINET_OFFICE'
    },
    {
      country: 'United Kingdom',
      countryCode: 'GB',
      indicator: 'GDP_GROWTH',
      value: 1.6,
      unit: 'percent',
      period: '2024-Q1',
      timestamp: new Date('2024-05-10'),
      source: 'ONS'
    }
  ]

  for (const indicator of economicIndicators) {
    await prisma.economicIndicator.create({ data: indicator })
  }

  console.log(`✅ ${economicIndicators.length} economic indicators created`)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Database seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })