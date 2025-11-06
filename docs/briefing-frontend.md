# FinX Frontend Droid – Complete Mission Briefing

## 🎯 Mission Overview
You are the **Frontend Droid** building the user interface for **FinX**—a modern trading and portfolio management platform with a **Dark Space Purple** glassmorphism design inspired by TradingView.

## 🏢 Working Environment
- **Repository**: https://github.com/xrey167/finx-webside
- **Branch**: `feature/frontend-foundation`
- **Directory**: `/frontend/`
- **Collaboration**: Backend Droid works in parallel on `/backend/`
- **Dependencies**: None—you can start immediately
- **Product Overview**: [docs/project-overview.md](./project-overview.md)
- **Phase 1 Focus**: Implement UI per [Phase 1 Implementation Plan](./phase1-implementation-plan.md) – Epics E3/E4/E6/E8, branches `feature/frontend-market-tide`, `feature/frontend-pricing-paywall`
- **Backlog**: Tasks & sprints in [phase1-backlog.md](./phase1-backlog.md)

## 🔄 Git Workflow
- `git fetch --all --prune`
- `git checkout feature/frontend-foundation`
- `git pull --rebase origin feature/frontend-foundation`
- Install dependencies with `npm install` and align shared types from `shared/`
- Commit with conventional messages (e.g. `feat(ui): ...`), rebase before pushing
- Run `npm run lint` and `npm run build`, ensure a clean `git status`, then `git push origin feature/frontend-foundation`

## 🚧 Scope Snapshot
- **Core Deliverables**: Next.js 14 scaffold, UI component library, authentication flow, dashboard layout
- **Theme**: Dark Space Purple palette with glassmorphism effects
- **Tooling**: Next.js App Router, Tailwind CSS, Framer Motion, Zustand, React Query
- **Timeline**: 2–3 weeks

---

## 📋 Phase 1: Foundation Setup (Week 1)

### 1.1 Next.js 14 Project Setup
```bash
# Navigate to the repository root, then create the frontend directory
mkdir frontend
cd frontend

# Initialize Next.js 14 project
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir
npm install
```

### 1.2 Additional Dependencies
```bash
# UI & Animation Libraries
npm install framer-motion @headlessui/react @heroicons/react
npm install clsx tailwind-merge lucide-react

# State Management
npm install zustand @tanstack/react-query @tanstack/react-query-devtools

# Form Management
npm install react-hook-form @hookform/resolvers zod

# Charts (for future phases)

```

### 1.3 Dark Space Purple Theme Implementation

**Tailwind Config** (`tailwind.config.js`):
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark Space Purple Theme
        primary: {
          DEFAULT: '#2D1B69',
          dark: '#1F1147',
          light: '#3F2B7F',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#2D1B69',
          700: '#1F1147',
          800: '#1E1B4B',
          900: '#312E81',
        },
        accent: {
          DEFAULT: '#C084FC',
          glow: '#E879F9',
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7C3AED',
          800: '#6B21A8',
          900: '#581C87',
        },
        background: {
          DEFAULT: '#0F0F23',
          secondary: '#16213E',
          tertiary: '#1A1A2E',
        },
        surface: {
          DEFAULT: '#1A1A2E',
          hover: '#232347',
          glass: 'rgba(26, 26, 46, 0.8)',
          elevated: '#2A2A4E',
        },
        border: {
          DEFAULT: '#2D2D4A',
          light: '#404066',
          glow: 'rgba(192, 132, 252, 0.3)',
        },
        text: {
          primary: '#E5E7EB',
          secondary: '#9CA3AF',
          muted: '#6B7280',
          accent: '#C084FC',
          success: '#10B981',
          danger: '#EF4444',
        },
        success: {
          DEFAULT: '#10B981',
          dark: '#047857',
          light: '#34D399',
        },
        danger: {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          light: '#F87171',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(192, 132, 252, 0.3)',
        'glow-strong': '0 0 40px rgba(192, 132, 252, 0.5)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(192, 132, 252, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(192, 132, 252, 0.6)' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

### 1.4 Global CSS Setup

**`app/globals.css`**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: #2D1B69;
    --color-accent: #C084FC;
    --color-background: #0F0F23;
    --color-surface: #1A1A2E;
    --color-text-primary: #E5E7EB;
    --color-success: #10B981;
    --color-danger: #EF4444;
  }

  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-text-primary;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .glassmorphism {
    @apply backdrop-blur-md bg-surface-glass border border-border-light/30;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }

  .glow-effect {
    @apply shadow-glow transition-shadow duration-300;
  }

  .glow-effect:hover {
    @apply shadow-glow-strong;
  }

  .gradient-text {
    @apply bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent;
  }
}
```

---

## 📋 Phase 2: Core UI Components (Week 1–2)

### 2.1 Essential UI Components Library
Create these components in `/components/ui/`.

#### Button (`components/ui/button.tsx`)
```typescript
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary hover:bg-primary-light text-white glow-effect',
      secondary: 'bg-surface hover:bg-surface-hover text-text-primary border border-border',
      ghost: 'hover:bg-surface-hover text-text-secondary hover:text-text-primary',
      danger: 'bg-danger hover:bg-danger-dark text-white',
    }

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8 text-lg',
    }

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
```

#### Card (`components/ui/card.tsx`)
```typescript
import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-surface border border-border',
      glass: 'glassmorphism',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg p-6 shadow-lg transition-all duration-200',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

export { Card }
```

#### Input (`components/ui/input.tsx`)
```typescript
import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-danger focus:ring-danger',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-danger">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
```

### 2.2 Utility Functions

Create `/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value)
}

export function formatPercent(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100)
}
```

---

## 📋 Phase 3: Authentication System (Week 2)

### 3.1 Authentication Pages
Create authentication layout in `/app/(auth)/`.

#### Login Page (`app/(auth)/login/page.tsx`)
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual login logic when backend is ready
      console.log('Login data:', data)
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md" variant="glass">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold gradient-text">FinX</h1>
          <p className="text-text-secondary mt-2">Welcome back to your trading platform</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>
          
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-text-muted">
            Don't have an account?{' '}
            <a href="/register" className="text-accent hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </Card>
    </div>
  )
}
```

### 3.2 State Management Setup

Create Zustand store in `/stores/`.

#### Auth Store (`stores/auth.ts`)
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) =>
        set({ user, token, isAuthenticated: true }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'finx-auth',
    }
  )
)
```

---

## 📋 Phase 4: Dashboard Layout (Week 2–3)

### 4.1 Dashboard Layout Component
Create `/app/dashboard/layout.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  HomeIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: CurrencyDollarIcon },
  { name: 'Charts', href: '/dashboard/charts', icon: ChartBarIcon },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <nav className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-border p-4">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-bold gradient-text">FinX</h1>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Desktop sidebar */}
      <nav className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-surface lg:border-r lg:border-border lg:p-4 lg:block">
        <div className="mb-8">
          <h1 className="text-xl font-bold gradient-text">FinX</h1>
        </div>
        <div className="space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="lg:ml-64">
        <header className="bg-surface border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <span className="text-text-secondary">Welcome, {user?.email}</span>
              <Button variant="secondary" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### 4.2 Dashboard Homepage

Create `/app/dashboard/page.tsx`:
```typescript
import { Card } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">Welcome to your FinX trading platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="glass">
          <div className="text-center">
            <p className="text-text-muted text-sm">Total Portfolio Value</p>
            <p className="text-2xl font-bold text-success">$25,674.89</p>
            <p className="text-sm text-success">+2.34% (24h)</p>
          </div>
        </Card>
        
        <Card variant="glass">
          <div className="text-center">
            <p className="text-text-muted text-sm">Active Positions</p>
            <p className="text-2xl font-bold text-text-primary">12</p>
            <p className="text-sm text-text-muted">3 new today</p>
          </div>
        </Card>
        
        <Card variant="glass">
          <div className="text-center">
            <p className="text-text-muted text-sm">24h P&L</p>
            <p className="text-2xl font-bold text-success">+$542.15</p>
            <p className="text-sm text-success">+2.15%</p>
          </div>
        </Card>
        
        <Card variant="glass">
          <div className="text-center">
            <p className="text-text-muted text-sm">Win Rate</p>
            <p className="text-2xl font-bold text-accent">73.2%</p>
            <p className="text-sm text-text-muted">Last 30 days</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Trades</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-surface-hover rounded-md">
                <div>
                  <p className="font-medium text-text-primary">AAPL</p>
                  <p className="text-sm text-text-muted">Apple Inc.</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-success">+$234.50</p>
                  <p className="text-sm text-text-muted">10 shares</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card variant="glass">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Market Overview</h3>
          <div className="space-y-3">
            {[
              { symbol: 'SPY', name: 'S&P 500 ETF', price: '$452.10', change: '+1.2%' },
              { symbol: 'QQQ', name: 'Nasdaq ETF', price: '$378.45', change: '+2.1%' },
              { symbol: 'BTC', name: 'Bitcoin', price: '$43,250', change: '-0.8%' },
            ].map((stock) => (
              <div key={stock.symbol} className="flex justify-between items-center p-3 bg-surface-hover rounded-md">
                <div>
                  <p className="font-medium text-text-primary">{stock.symbol}</p>
                  <p className="text-sm text-text-muted">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-text-primary">{stock.price}</p>
                  <p className={`text-sm ${stock.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                    {stock.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
```

---

## ✅ Definition of Done

### Component Requirements
- [ ] TypeScript-first implementation with strict typing
- [ ] Responsive design across breakpoints
- [ ] Dark Space Purple theme applied consistently
- [ ] Accessibility (WCAG 2.1 AA) met for critical flows
- [ ] Performance targets met (Lighthouse > 90)
- [ ] Loading and error states implemented

### Authentication System
- [ ] Login and registration forms with validation
- [ ] Protected dashboard routes using Zustand auth state
- [ ] Persistent auth state via storage middleware
- [ ] Graceful error messaging and form feedback

### Dashboard Layout
- [ ] Responsive sidebar (mobile + desktop)
- [ ] Navigation between dashboard routes
- [ ] Header with user context and logout
- [ ] Metric cards and data grids with mock data

### UI Components Library
- [ ] Button variants with loading state
- [ ] Card variants (default + glass)
- [ ] Input with validation messaging
- [ ] Utility helpers (`cn`, currency/percent formatters)
- [ ] Ready for future components (modal, skeleton, etc.)

### Code Quality
- [ ] ESLint and TypeScript checks pass
- [ ] Consistent file structure and naming
- [ ] Complex logic documented where necessary
- [ ] Shared types pulled from `../shared/types/api.ts`

### Integration Readiness
- [ ] API base read from `NEXT_PUBLIC_API_URL`
- [ ] Mock data isolated for replacement with real APIs
- [ ] Error boundaries around async UI flows

### Testing & Documentation
- [ ] Manual testing across Chrome, Firefox, Safari, Edge
- [ ] Documentation of component usage patterns
- [ ] Conventional commit history maintained

---

## 🚀 Success Criteria
Deliver a production-ready Next.js 14 frontend featuring:

1. ✅ Dark Space Purple themed UI scaffold
2. ✅ Authentication flow with protected routes
3. ✅ Responsive dashboard layout and metrics
4. ✅ Reusable component library aligned with design system
5. ✅ Zustand + React Query setup for future integrations
6. ✅ Mobile-responsive, high-performance experience
7. ✅ Frontend ready for backend API integration and chart enhancements

**Timeline**: 2–3 weeks  
**Next Phase**: Backend API integration and advanced chart visualizations

---

## 📞 Communication & Support
- Commit progress daily with conventional messages
- Raise pull requests at the end of each major phase
- Surface blockers early for support
- Provide weekly status updates summarizing accomplishments and plans

**Repository**: https://github.com/xrey167/finx-webside  
**Branch**: `feature/frontend-foundation`  
**Directory**: `/frontend/`

🚀 **Ready to craft an exceptional trading platform frontend!**