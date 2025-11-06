const Redis = require('ioredis')

let redisClient: any = null

export const connectRedis = (): any => {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
    
    redisClient = new Redis(redisUrl)

    redisClient.on('connect', () => {
      console.log('✅ Connected to Redis')
    })

    redisClient.on('error', (error: Error) => {
      console.error('❌ Redis connection error:', error)
    })

    redisClient.on('ready', () => {
      console.log('🚀 Redis is ready')
    })
  }

  return redisClient
}

export const getRedisClient = (): any => {
  return redisClient
}

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.disconnect()
    redisClient = null
    console.log('🔌 Disconnected from Redis')
  }
}