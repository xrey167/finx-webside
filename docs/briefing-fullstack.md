# FinX Full-Stack Integration Droid – Complete Mission Briefing

## 🎯 Mission Overview
You are the **Full-Stack Integration Droid** tasked with unifying the FinX stack—bridging frontend, backend, and data visualizations; hardening infrastructure; orchestrating deployments; and ensuring we ship a resilient, production-ready trading platform.

## 🏢 Working Environment
- **Repository**: https://github.com/xrey167/finx-webside
- **Branch**: `feature/integration-devops`
- **Directories**: project root plus `/docker/`, `/deployment/`, `/scripts/`
- **Collaboration**: Requires coordinated hand-off from Backend, Frontend, and Data Viz droids
- **Prerequisites**: Foundational frontend/backend features must be in place prior to integration

## 🔄 Git Workflow
- `git fetch --all --prune`
- `git checkout feature/integration-devops`
- `git pull --rebase origin feature/integration-devops`
- Merge dependencies when needed (e.g. `git merge origin/feature/backend-api`)
- Use conventional commits (`feat(infra): ...`, `chore(ci): ...`), rebase before push
- Validate backend build/tests, frontend lint/build, and infra scripts before `git push`
- Keep PR descriptions updated with integration status, blockers, and deployment notes

## 🚧 Scope Snapshot
- **Integration**: API wiring, shared types, WebSocket connectivity, auth flow alignment
- **Infrastructure**: Docker composition, container builds, reverse proxy, environment configs
- **Quality**: Unit/integration/E2E tests, performance benchmarking, lint/type discipline
- **Deployment**: Production Docker, CI/CD pipeline, monitoring and observability footprint
- **Timeline**: ~4 weeks across structured phases

---

## 📋 Phase 1: API Integration & Real-time Connectivity (Week 1)

### 1.1 Frontend-Backend Integration

**API Client Setup** (`frontend/lib/api.ts`):
```typescript
import { QueryClient } from '@tanstack/react-query'

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// API Client with Authentication
class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  setToken(token: string) {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // Authentication endpoints
  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: any) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async refreshToken(refreshToken: string) {
    return this.request('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  }

  // Portfolio endpoints
  async getPortfolios() {
    return this.request('/api/portfolios')
  }

  async createPortfolio(portfolioData: any) {
    return this.request('/api/portfolios', {
      method: 'POST',
      body: JSON.stringify(portfolioData),
    })
  }

  async addTrade(portfolioId: string, tradeData: any) {
    return this.request(`/api/portfolios/${portfolioId}/trades`, {
      method: 'POST',
      body: JSON.stringify(tradeData),
    })
  }

  // Market data endpoints
  async getQuote(symbol: string) {
    return this.request(`/api/market/quote/${symbol}`)
  }

  async searchSymbols(query: string) {
    return this.request(`/api/market/search?q=${encodeURIComponent(query)}`)
  }

  // Economic data endpoints
  async getEconomicData(indicator: string) {
    return this.request(`/api/economic/${indicator}`)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

// React Query configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})
```

### 1.2 WebSocket Integration

**Real-time Data Hook** (`frontend/hooks/useWebSocket.ts`):
```typescript
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface UseWebSocketProps {
  url: string
  options?: any
}

export function useWebSocket({ url, options = {} }: UseWebSocketProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Create socket connection
    const socket = io(url, {
      transports: ['websocket'],
      ...options,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setIsConnected(true)
      setError(null)
      console.log('WebSocket connected')
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
      console.log('WebSocket disconnected')
    })

    socket.on('connect_error', (err) => {
      setError(err.message)
      console.error('WebSocket connection error:', err)
    })

    return () => {
      socket.disconnect()
    }
  }, [url])

  const emit = (event: string, data?: any) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data)
    }
  }

  const on = (event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback)
    }
  }

  const off = (event: string) => {
    if (socketRef.current) {
      socketRef.current.off(event)
    }
  }

  return {
    isConnected,
    error,
    emit,
    on,
    off,
  }
}

// Market data WebSocket hook
export function useMarketData(symbols: string[]) {
  const [marketData, setMarketData] = useState<Record<string, any>>({})
  const { isConnected, emit, on, off } = useWebSocket({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000',
  })

  useEffect(() => {
    if (isConnected && symbols.length > 0) {
      // Subscribe to market data
      emit('subscribe:market', symbols)

      // Listen for market data updates
      on('market:data', (data) => {
        setMarketData(prev => ({
          ...prev,
          [data.symbol]: data,
        }))
      })

      on('market:update', (data) => {
        setMarketData(prev => ({
          ...prev,
          [data.symbol]: data,
        }))
      })

      return () => {
        off('market:data')
        off('market:update')
        emit('unsubscribe:market', symbols)
      }
    }
  }, [isConnected, symbols])

  return {
    marketData,
    isConnected,
  }
}
```

### 1.3 Authentication Integration

**Auth Provider** (`frontend/providers/AuthProvider.tsx`):
```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'

interface AuthContextType {
  isAuthenticated: boolean
  user: any | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, token, isAuthenticated, login: setAuth, logout: clearAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set API token if available
    if (token) {
      apiClient.setToken(token)
    }
    
    // Check authentication on mount
    if (isAuthenticated && user) {
      refreshAuth()
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password)
      
      if (response.success) {
        const { user, tokens } = response.data
        setAuth(user, tokens.accessToken)
        apiClient.setToken(tokens.accessToken)
        
        // Store refresh token securely
        localStorage.setItem('refreshToken', tokens.refreshToken)
        
        router.push('/dashboard')
      } else {
        throw new Error(response.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    clearAuth()
    localStorage.removeItem('refreshToken')
    apiClient.setToken('')
    router.push('/login')
  }

  const refreshAuth = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        logout()
        return
      }

      const response = await apiClient.refreshToken(refreshToken)
      
      if (response.success) {
        const { tokens } = response.data
        apiClient.setToken(tokens.accessToken)
        localStorage.setItem('refreshToken', tokens.refreshToken)
      } else {
        logout()
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

---

## 📋 Phase 2: Docker & Development Environment (Week 2)

### 2.1 Docker Configuration

**Root Docker Compose** (`docker-compose.yml`):
```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: finx_dev
      POSTGRES_USER: finx_user
      POSTGRES_PASSWORD: finx_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init:/docker-entrypoint-initdb.d
    networks:
      - finx-network

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - finx-network

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://finx_user:finx_password@postgres:5432/finx_dev
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=dev-jwt-secret-key-32-characters-long
      - JWT_REFRESH_SECRET=dev-refresh-secret-key-32-characters
      - CORS_ORIGIN=http://localhost:3000
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend:/app
      - backend_node_modules:/app/node_modules
    networks:
      - finx-network
    restart: unless-stopped

  # Frontend Application
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:8000
      - NEXT_PUBLIC_WS_URL=ws://localhost:8000
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - frontend_node_modules:/app/node_modules
    networks:
      - finx-network
    restart: unless-stopped

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - finx-network
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
  backend_node_modules:
  frontend_node_modules:

networks:
  finx-network:
    driver: bridge
```

**Backend Dockerfile** (`backend/Dockerfile`):
```dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start application
CMD ["npm", "start"]
```

**Frontend Dockerfile** (`frontend/Dockerfile`):
```dockerfile
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set permissions
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
CMD ["npm", "start"]
```

### 2.2 Nginx Configuration

**Nginx Config** (`nginx/nginx.conf`):
```nginx
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }

    upstream backend {
        server backend:8000;
    }

    server {
        listen 80;
        server_name localhost;

        # Frontend routes
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # WebSocket support
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        # Backend API routes
        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # WebSocket support for socket.io
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        # Health checks
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
}
```

### 2.3 Development Scripts

**Development Scripts** (`scripts/dev-setup.sh`):
```bash
#!/bin/bash

echo "🚀 Setting up FinX Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start services
echo "🏗️ Building and starting services..."
docker-compose up --build -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker-compose exec -T postgres pg_isready -U finx_user; do
    echo "PostgreSQL is unavailable - sleeping"
    sleep 2
done

echo "✅ PostgreSQL is ready!"

# Run database migrations
echo "🗃️ Running database migrations..."
docker-compose exec backend npm run db:migrate

# Seed database with sample data
echo "🌱 Seeding database..."
docker-compose exec backend npm run db:seed

echo "🎉 Development environment is ready!"
echo ""
echo "📊 Services:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "  Full App: http://localhost:80"
echo ""
echo "🔧 Development commands:"
echo "  View logs:     docker-compose logs -f"
echo "  Stop services: docker-compose down"
echo "  Restart:       docker-compose restart [service]"
echo ""
echo "Happy coding! 🚀"
```

---

## 📋 Phase 3: Testing & Quality Assurance (Week 3)

### 3.1 End-to-End Testing Setup

**Playwright E2E Tests** (`tests/e2e/auth.spec.ts`):
```typescript
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('user can register, login, and access dashboard', async ({ page }) => {
    // Navigate to registration
    await page.goto('/register')
    
    // Fill registration form
    await page.fill('[data-testid=email-input]', 'test@finx.com')
    await page.fill('[data-testid=password-input]', 'password123')
    await page.fill('[data-testid=first-name-input]', 'Test')
    await page.fill('[data-testid=last-name-input]', 'User')
    
    // Submit registration
    await page.click('[data-testid=register-button]')
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    
    // Verify user is logged in
    await expect(page.locator('[data-testid=user-menu]')).toBeVisible()
    
    // Logout
    await page.click('[data-testid=user-menu]')
    await page.click('[data-testid=logout-button]')
    
    // Should redirect to login
    await expect(page).toHaveURL('/login')
  })

  test('user can login with existing credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('[data-testid=email-input]', 'demo@finx.com')
    await page.fill('[data-testid=password-input]', 'password123')
    await page.click('[data-testid=login-button]')
    
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('[data-testid=dashboard-title]')).toContainText('Dashboard')
  })
})

test.describe('Portfolio Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('[data-testid=email-input]', 'demo@finx.com')
    await page.fill('[data-testid=password-input]', 'password123')
    await page.click('[data-testid=login-button]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('user can create a new portfolio', async ({ page }) => {
    await page.goto('/dashboard/portfolio')
    
    await page.click('[data-testid=create-portfolio-button]')
    await page.fill('[data-testid=portfolio-name-input]', 'Test Portfolio')
    await page.fill('[data-testid=portfolio-description-input]', 'Test description')
    await page.click('[data-testid=save-portfolio-button]')
    
    await expect(page.locator('[data-testid=portfolio-card]')).toContainText('Test Portfolio')
  })

  test('user can add a trade to portfolio', async ({ page }) => {
    await page.goto('/dashboard/portfolio')
    
    // Click on first portfolio
    await page.click('[data-testid=portfolio-card]:first-child')
    
    // Add trade
    await page.click('[data-testid=add-trade-button]')
    await page.fill('[data-testid=trade-symbol-input]', 'AAPL')
    await page.selectOption('[data-testid=trade-type-select]', 'BUY')
    await page.fill('[data-testid=trade-quantity-input]', '10')
    await page.fill('[data-testid=trade-price-input]', '150.00')
    await page.click('[data-testid=save-trade-button]')
    
    await expect(page.locator('[data-testid=trade-list]')).toContainText('AAPL')
  })
})
```

### 3.2 API Integration Tests

**API Integration Tests** (`tests/integration/api.test.ts`):
```typescript
import { apiClient } from '@/lib/api'

describe('API Integration Tests', () => {
  let authToken: string
  let testUserId: string

  beforeAll(async () => {
    // Create test user and login
    const testUser = {
      email: `test-${Date.now()}@finx.com`,
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
    }

    const registerResponse = await apiClient.register(testUser)
    expect(registerResponse.success).toBe(true)

    const loginResponse = await apiClient.login(testUser.email, testUser.password)
    expect(loginResponse.success).toBe(true)
    
    authToken = loginResponse.data.tokens.accessToken
    testUserId = loginResponse.data.user.id
    apiClient.setToken(authToken)
  })

  describe('Portfolio Management', () => {
    let portfolioId: string

    test('should create a portfolio', async () => {
      const portfolioData = {
        name: 'Test Portfolio',
        description: 'Integration test portfolio',
        currency: 'USD',
      }

      const response = await apiClient.createPortfolio(portfolioData)
      expect(response.success).toBe(true)
      expect(response.data.name).toBe(portfolioData.name)
      
      portfolioId = response.data.id
    })

    test('should get user portfolios', async () => {
      const response = await apiClient.getPortfolios()
      expect(response.success).toBe(true)
      expect(Array.isArray(response.data)).toBe(true)
      expect(response.data.length).toBeGreaterThan(0)
    })

    test('should add trade to portfolio', async () => {
      const tradeData = {
        symbol: 'AAPL',
        type: 'BUY',
        quantity: 10,
        price: 150.00,
        fees: 1.99,
        executedAt: new Date().toISOString(),
        notes: 'Test trade',
      }

      const response = await apiClient.addTrade(portfolioId, tradeData)
      expect(response.success).toBe(true)
      expect(response.data.symbol).toBe(tradeData.symbol)
      expect(response.data.type).toBe(tradeData.type)
    })
  })

  describe('Market Data', () => {
    test('should get stock quote', async () => {
      const response = await apiClient.getQuote('AAPL')
      expect(response.success).toBe(true)
      expect(response.data.symbol).toBe('AAPL')
      expect(typeof response.data.price).toBe('number')
    })

    test('should search symbols', async () => {
      const response = await apiClient.searchSymbols('AAPL')
      expect(response.success).toBe(true)
      expect(Array.isArray(response.data)).toBe(true)
    })
  })

  describe('Economic Data', () => {
    test('should get inflation data', async () => {
      const response = await apiClient.getEconomicData('inflation')
      expect(response.success).toBe(true)
      expect(Array.isArray(response.data)).toBe(true)
    })
  })
})
```

### 3.3 Performance Testing

**Performance Test Config** (`tests/performance/load-test.js`):
```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate } from 'k6/metrics'

// Performance test configuration
export let options = {
  stages: [
    { duration: '2m', target: 10 }, // Ramp up to 10 users
    { duration: '5m', target: 10 }, // Stay at 10 users
    { duration: '2m', target: 20 }, // Ramp up to 20 users
    { duration: '5m', target: 20 }, // Stay at 20 users
    { duration: '2m', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.05'],   // Error rate under 5%
  },
}

const errorRate = new Rate('errors')

export default function() {
  // Test authentication endpoint
  let loginResponse = http.post('http://localhost:8000/api/auth/login', JSON.stringify({
    email: 'demo@finx.com',
    password: 'password123',
  }), {
    headers: { 'Content-Type': 'application/json' },
  })

  check(loginResponse, {
    'login status is 200': (r) => r.status === 200,
    'login response time < 200ms': (r) => r.timings.duration < 200,
  }) || errorRate.add(1)

  if (loginResponse.status === 200) {
    const authToken = JSON.parse(loginResponse.body).data.tokens.accessToken

    // Test portfolio endpoint
    let portfolioResponse = http.get('http://localhost:8000/api/portfolios', {
      headers: { Authorization: `Bearer ${authToken}` },
    })

    check(portfolioResponse, {
      'portfolio status is 200': (r) => r.status === 200,
      'portfolio response time < 300ms': (r) => r.timings.duration < 300,
    }) || errorRate.add(1)

    // Test market data endpoint
    let marketResponse = http.get('http://localhost:8000/api/market/quote/AAPL')

    check(marketResponse, {
      'market data status is 200': (r) => r.status === 200,
      'market data response time < 500ms': (r) => r.timings.duration < 500,
    }) || errorRate.add(1)
  }

  sleep(1)
}
```

---

## 📋 Phase 4: Production Deployment (Week 4)

### 4.1 Production Docker Configuration

**Production Docker Compose** (`docker-compose.prod.yml`):
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - finx-network
    restart: always
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - finx-network
    restart: always
    deploy:
      resources:
        limits:
          memory: 256M
        reservations:
          memory: 128M

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
      - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
      - ALPHA_VANTAGE_API_KEY=${ALPHA_VANTAGE_API_KEY}
      - COINGECKO_API_KEY=${COINGECKO_API_KEY}
    depends_on:
      - postgres
      - redis
    networks:
      - finx-network
    restart: always
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
      - NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
    depends_on:
      - backend
    networks:
      - finx-network
    restart: always
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M

  nginx:
    build:
      context: ./nginx
      dockerfile: Dockerfile.prod
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - frontend
      - backend
    networks:
      - finx-network
    restart: always
    deploy:
      resources:
        limits:
          memory: 256M
        reservations:
          memory: 128M

volumes:
  postgres_data:
  redis_data:

networks:
  finx-network:
    driver: bridge
```

### 4.2 CI/CD Pipeline

**GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
```yaml
name: FinX CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
          
      - name: Install dependencies
        run: cd frontend && npm ci
        
      - name: Run linting
        run: cd frontend && npm run lint
        
      - name: Run type checking
        run: cd frontend && npm run type-check
        
      - name: Run tests
        run: cd frontend && npm run test
        
      - name: Build application
        run: cd frontend && npm run build

  test-backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: finx_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
          
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json
          
      - name: Install dependencies
        run: cd backend && npm ci
        
      - name: Run linting
        run: cd backend && npm run lint
        
      - name: Run type checking
        run: cd backend && npx tsc --noEmit
        
      - name: Run database migrations
        run: cd backend && npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/finx_test
          
      - name: Run tests
        run: cd backend && npm run test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/finx_test
          
      - name: Build application
        run: cd backend && npm run build

  e2e-tests:
    runs-on: ubuntu-latest
    needs: [test-frontend, test-backend]
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Start services
        run: docker-compose -f docker-compose.test.yml up -d
        
      - name: Wait for services
        run: sleep 30
        
      - name: Install Playwright
        run: cd tests && npm ci && npx playwright install
        
      - name: Run E2E tests
        run: cd tests && npx playwright test
        
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: tests/playwright-report/

  deploy-staging:
    runs-on: ubuntu-latest
    needs: [test-frontend, test-backend, e2e-tests]
    if: github.ref == 'refs/heads/main'
    environment: staging
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to staging
        run: |
          echo "Deploying to staging environment..."
          # Add actual deployment commands here
          
  deploy-production:
    runs-on: ubuntu-latest
    needs: [deploy-staging]
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to production
        run: |
          echo "Deploying to production environment..."
          # Add actual deployment commands here
```

### 4.3 Monitoring & Logging

**Health Check Endpoints** (`backend/src/routes/health.routes.ts`):
```typescript
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import Redis from 'ioredis'

const router = Router()
const prisma = new PrismaClient()
const redis = new Redis(process.env.REDIS_URL!)

// Basic health check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  })
})

// Detailed health check
router.get('/health/detailed', async (req, res) => {
  const checks = {
    server: true,
    database: false,
    redis: false,
    externalApis: false,
  }

  // Check database connection
  try {
    await prisma.$queryRaw`SELECT 1`
    checks.database = true
  } catch (error) {
    console.error('Database health check failed:', error)
  }

  // Check Redis connection
  try {
    await redis.ping()
    checks.redis = true
  } catch (error) {
    console.error('Redis health check failed:', error)
  }

  // Check external APIs
  try {
    const alphaVantageCheck = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    )
    checks.externalApis = alphaVantageCheck.ok
  } catch (error) {
    console.error('External API health check failed:', error)
  }

  const allHealthy = Object.values(checks).every(check => check === true)
  const status = allHealthy ? 200 : 503

  res.status(status).json({
    status: allHealthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date().toISOString(),
  })
})

// Metrics endpoint for monitoring
router.get('/metrics', async (req, res) => {
  const metrics = {
    activeConnections: 0, // Add actual connection count
    responseTime: {
      p50: 0,
      p90: 0,
      p99: 0,
    },
    errorRate: 0,
    throughput: 0,
    databaseConnections: 0, // Add actual DB connection count
    cacheHitRate: 0,
  }

  res.json(metrics)
})

export default router
```

---

## ✅ Definition of Done

### **API Integration:**
- [ ] **Frontend-Backend Connection**: All API endpoints properly integrated
- [ ] **Real-time WebSocket**: Market data streaming working
- [ ] **Authentication Flow**: Complete login/logout with token refresh
- [ ] **Error Handling**: Comprehensive error handling across all integrations
- [ ] **Type Safety**: Shared TypeScript types used throughout
- [ ] **Performance**: API responses under 300ms for 95% of requests

### **Development Environment:**
- [ ] **Docker Setup**: Complete Docker development environment
- [ ] **Database Integration**: PostgreSQL with Prisma migrations
- [ ] **Cache Layer**: Redis integration for performance
- [ ] **Hot Reload**: Frontend and backend hot reload working
- [ ] **Environment Variables**: Proper environment configuration
- [ ] **Development Scripts**: Easy setup and teardown scripts

### **Testing & Quality:**
- [ ] **Unit Tests**: Frontend and backend unit test coverage >80%
- [ ] **Integration Tests**: API integration tests passing
- [ ] **E2E Tests**: Complete user journey tests with Playwright
- [ ] **Performance Tests**: Load testing with K6
- [ ] **Code Quality**: ESLint, TypeScript strict mode, no errors
- [ ] **Security**: Authentication, authorization, input validation

### **Production Deployment:**
- [ ] **Production Docker**: Optimized production containers
- [ ] **CI/CD Pipeline**: Automated testing and deployment
- [ ] **Monitoring**: Health checks and metrics endpoints
- [ ] **Logging**: Structured logging with correlation IDs
- [ ] **Security**: SSL/TLS, security headers, rate limiting
- [ ] **Performance**: CDN, compression, caching strategies

### **Documentation:**
- [ ] **API Documentation**: OpenAPI/Swagger documentation
- [ ] **Deployment Guide**: Step-by-step deployment instructions
- [ ] **Development Guide**: Local development setup guide
- [ ] **Architecture Docs**: System architecture documentation
- [ ] **Monitoring Guide**: Observability and troubleshooting guide

---

## 🚀 Success Criteria

**After completion, you will have delivered:**

1. ✅ **Fully Integrated System** with frontend, backend, and data visualization
2. ✅ **Production-Ready Deployment** with Docker and CI/CD
3. ✅ **Comprehensive Testing Suite** (unit, integration, E2E, performance)
4. ✅ **Real-time Data Streaming** with WebSocket integration
5. ✅ **Authentication & Security** with JWT and secure practices
6. ✅ **Performance Optimization** with caching and monitoring
7. ✅ **Development Environment** with hot reload and easy setup
8. ✅ **Production Monitoring** with health checks and metrics
9. ✅ **Documentation & Guides** for development and deployment
10. ✅ **Scalable Architecture** ready for production traffic

**Timeline**: 4 weeks
**Next Phase**: Advanced monitoring, scaling strategies, and mobile app integration

---

## 📞 Communication & Support

- **Daily commits**: Document integration progress and infrastructure changes
- **Pull requests**: Create PR when major integration milestones are complete
- **Conventional commits**: Use `feat:`, `fix:`, `ci:`, `perf:`, `docs:` prefixes
- **Infrastructure Focus**: Optimize for reliability, performance, and scalability
- **Security Priority**: Implement security best practices throughout
- **Documentation**: Maintain up-to-date deployment and development guides

**Repository**: https://github.com/xrey167/finx-webside
**Branch**: `feature/integration-devops`
**Working Directory**: `/` (root), `/docker/`, `/deployment/`, `/scripts/`

🚀 **Ready to bring everything together in a production-ready system!**