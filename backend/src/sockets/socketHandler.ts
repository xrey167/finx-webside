import { Server } from 'socket.io'
import { getRedisClient } from '../config/redis'
import { SocketEvent, MarketSubscription, PortfolioSubscription } from '../types'

export const initializeSocket = (io: Server) => {
  const redis = getRedisClient()

  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`)

    // Handle market data subscriptions
    socket.on('subscribe:market', (data: MarketSubscription) => {
      const { symbols } = data
      
      symbols.forEach(symbol => {
        socket.join(`market:${symbol}`)
      })
      
      console.log(`📊 Client ${socket.id} subscribed to market data:`, symbols)
    })

    // Handle portfolio subscriptions
    socket.on('subscribe:portfolio', (data: PortfolioSubscription) => {
      const { portfolioId } = data
      socket.join(`portfolio:${portfolioId}`)
      
      console.log(`💼 Client ${socket.id} subscribed to portfolio: ${portfolioId}`)
    })

    // Handle unsubscribe from market data
    socket.on('unsubscribe:market', (data: MarketSubscription) => {
      const { symbols } = data
      
      symbols.forEach(symbol => {
        socket.leave(`market:${symbol}`)
      })
      
      console.log(`📊 Client ${socket.id} unsubscribed from market data:`, symbols)
    })

    // Handle unsubscribe from portfolio
    socket.on('unsubscribe:portfolio', (data: PortfolioSubscription) => {
      const { portfolioId } = data
      socket.leave(`portfolio:${portfolioId}`)
      
      console.log(`💼 Client ${socket.id} unsubscribed from portfolio: ${portfolioId}`)
    })

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`)
    })
  })

  // Listen for Redis pub/sub events if Redis is available
  if (redis) {
    const subscriber = redis.duplicate()
    
    subscriber.subscribe('market:update', 'portfolio:update')
    
    subscriber.on('message', (channel: string, message: string) => {
      try {
        const data = JSON.parse(message)
        
        if (channel === 'market:update') {
          // Broadcast market updates to subscribed clients
          io.to(`market:${data.symbol}`).emit('market:update', data)
        } else if (channel === 'portfolio:update') {
          // Broadcast portfolio updates to subscribed clients
          io.to(`portfolio:${data.portfolioId}`).emit('portfolio:update', data)
        }
      } catch (error) {
        console.error('Error parsing Redis message:', error)
      }
    })
  }
}

// Helper function to broadcast market data updates
export const broadcastMarketUpdate = (symbol: string, data: any) => {
  const redis = getRedisClient()
  if (redis) {
    const event: SocketEvent = {
      type: 'market:update',
      data: { symbol, ...data },
      timestamp: new Date().toISOString()
    }
    
    redis.publish('market:update', JSON.stringify(event))
  }
}

// Helper function to broadcast portfolio updates
export const broadcastPortfolioUpdate = (portfolioId: string, data: any) => {
  const redis = getRedisClient()
  if (redis) {
    const event: SocketEvent = {
      type: 'portfolio:update',
      data: { portfolioId, ...data },
      timestamp: new Date().toISOString()
    }
    
    redis.publish('portfolio:update', JSON.stringify(event))
  }
}