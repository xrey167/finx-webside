# FinX Data Visualizer Droid – Complete Mission Briefing

## 🎯 Mission Overview
You are the **Data Visualizer Droid** responsible for delivering TradingView-level charting, immersive economic world maps, and analytics dashboards that turn raw FinX data into actionable visual stories.

## 🏢 Working Environment
- **Repository**: https://github.com/xrey167/finx-webside
- **Branch**: `feature/data-visualization`
- **Directories**: `/frontend/components/charts/`, `/frontend/components/maps/`
- **Collaboration**: Builds atop Frontend (UI scaffolding) and Backend (data APIs)
- **Prerequisites**: Frontend foundation must be complete before visualization integration
- **Product Overview**: [docs/project-overview.md](./project-overview.md)
- **Phase 1 Focus**: Deliver Market Tide & Periscope visuals per [Phase 1 Implementation Plan](./phase1-implementation-plan.md) – Epic E3/E4
- **Backlog**: Consult [phase1-backlog.md](./phase1-backlog.md) for sprint sequencing & dependencies

## 🔄 Git Workflow
- `git fetch --all --prune`
- `git checkout feature/data-visualization`
- `git pull --rebase origin feature/data-visualization`
- Install/refresh dependencies via `npm install` from `/frontend`
- Use conventional commits (e.g. `feat(charts): ...`), rebase before pushing
- Run `npm run lint` plus visualization-specific checks; ensure `git status` is clean
- `git push origin feature/data-visualization` and update PR with screenshots/previews

## 🚧 Scope Snapshot
- **Focus Areas**: Trading charts, multi-timeframe analytics, economic world maps, portfolio visualization
- **Tooling**: Lightweight Charts, D3.js, React Query, custom hooks/selectors
- **Data Sources**: Backend market, portfolio, and economic indicator endpoints
- **Timeline**: 3–4 weeks (staged delivery per phase)

---

## 📋 Phase 1: Advanced Trading Charts (Week 1–2)

### 1.1 Charting Infrastructure Setup
```bash
cd frontend
npm install lightweight-charts d3 @types/d3 react-use-measure date-fns
```

### 1.2 Core Components
- `components/charts/CandlestickChart.tsx` — Dark Space Purple themed candlestick with resize handling
- `components/charts/TechnicalIndicators.tsx` — SMA, EMA, RSI, MACD utilities & hooks
- `components/charts/MultiTimeframeChart.tsx` — Timeframe selector (1m → 1w) with mock data fallback

### 1.3 Required Features
- Fit-to-content scaling, crosshair, zoom/pan interactions
- Indicator overlays with shared formatting utilities (`formatCurrency`, `formatPercent`)
- Mock data generators until backend endpoints are wired

---

## 📋 Phase 2: Interactive Economic World Maps (Week 2–3)

### 2.1 World Map Rendering with D3
- `components/maps/EconomicWorldMap.tsx`
  - Natural Earth projection with responsive SVG
  - Dynamic color scales per indicator (inflation, unemployment, GDP growth, interest rate)
  - Hover/click tooltips, legends, and selected-country highlights

### 2.2 Economic Dashboard Shell
- `components/maps/EconomicDashboard.tsx`
  - Indicator switcher with status cards
  - Loading states, mock economic datasets, summary statistics (avg/high/low)
  - Ready for backend integration (`/api/economic/:indicator`)

---

## 📋 Phase 3: Portfolio Visualization & Analytics (Week 3–4)

### 3.1 Portfolio Performance Charts
- `components/charts/PortfolioChart.tsx` — Portfolio vs benchmark line series (Lightweight Charts)
- Ensure responsive resizing and theme alignment

### 3.2 Asset Allocation Insights
- `components/charts/AssetAllocationChart.tsx` — D3 donut with hover animations, legend, center summary
- Future-ready for drill-down interactions and dynamic color palettes

---

## ✅ Definition of Done

### Trading Charts
- [ ] Lightweight Charts integrated with themed candlesticks
- [ ] Technical indicators (SMA, EMA, RSI, MACD) rendered accurately
- [ ] Multi-timeframe switching (1m–1w) with performant data handling
- [ ] Interactive controls: zoom, pan, crosshair, tooltips
- [ ] Smooth rendering for 1,000+ datapoints across screen sizes

### Economic Maps
- [ ] D3 maps with Natural Earth projection and indicator-specific color scales
- [ ] Hover/click tooltips, legends, and UX affordances
- [ ] Indicator toggle (inflation, unemployment, GDP growth, interest rates)
- [ ] Responsive performance across desktop/tablet resolutions

### Portfolio Analytics
- [ ] Portfolio vs benchmark comparison chart
- [ ] Asset allocation donut with labeled breakdowns
- [ ] Real-time update hooks prepared for WebSocket data

### Code Quality & Integration
- [ ] Strict TypeScript (no implicit `any`)
- [ ] Cleanup of chart/map instances to prevent leaks
- [ ] Shared type usage from `shared/`
- [ ] Error boundaries and graceful fallbacks for missing data
- [ ] Ready for backend/WebSocket integration once endpoints are live

### Testing & Docs
- [ ] Visual regression/manual QA across Chrome, Firefox, Safari, Edge
- [ ] Linting (`npm run lint`) passes without warnings
- [ ] PRs include screenshots/GIFs of visualization changes

---

## 🚀 Success Criteria
Deliver a visualization suite that provides:
1. ✅ TradingView-quality candlestick and indicator charts
2. ✅ Multi-timeframe analytics with configurable overlays
3. ✅ Interactive economic world maps covering 4+ key indicators
4. ✅ Portfolio dashboards (performance vs benchmark, allocation insights)
5. ✅ Real-time capable charting (sockets ready)
6. ✅ Consistent Dark Space Purple visual language across all assets

**Timeline**: 3–4 weeks  
**Next Phase**: Deeper analytics, custom indicators, mobile optimization

---

## 📞 Communication & Support
- Commit daily with visualization-specific notes
- Provide PRs per milestone, attaching screenshots or recordings
- Flag performance or data-integration blockers early
- Coordinate with Backend for API contract alignment and WebSocket feeds

**Repository**: https://github.com/xrey167/finx-webside  
**Branch**: `feature/data-visualization`  
**Directories**: `/frontend/components/charts/`, `/frontend/components/maps/`

🚀 **Ready to craft immersive financial data visualizations!**
# FinX Data Visualizer Droid – Complete Mission Briefing

## 🎯 Mission Overview
You are the **Data Visualizer Droid** delivering **advanced trading charts**, **interactive economic world maps**, and immersive **data storytelling** for the FinX platform—bringing TradingView-level analytics into a cohesive Dark Space Purple experience.

## 🏢 Working Environment
- **Repository**: https://github.com/xrey167/finx-webside
- **Branch**: `feature/data-visualization`
- **Working Directories**: `/frontend/components/charts/`, `/frontend/components/maps/`
- **Collaboration**: Builds on Frontend and Backend foundations
- **Dependencies**: Frontend groundwork must be in place before chart layers

## 🔄 Git Workflow
- `git fetch --all --prune`
- `git checkout feature/data-visualization`
- `git pull --rebase origin feature/data-visualization`
- Run `npm install` inside `frontend`
- Commit with conventional messages (e.g. `feat(charts): ...`), rebase before pushing
- Execute `npm run lint` and visualization-specific tests before `git push origin feature/data-visualization`
- Update/open PR summarizing chart and map progress with screenshots when possible

## 🚧 Scope Snapshot
- **Focus Areas**: Trading charts, economic maps, portfolio analytics visualizations
- **Tech Stack**: Lightweight Charts, D3, React Query, custom hooks and selectors
- **Data Sources**: Backend APIs for market, portfolio, and economic indicators
- **Timeline**: Multi-phase delivery across 3–4 weeks

---

## 📋 Phase 1: Advanced Trading Charts (Week 1-2)

### 1.1 TradingView Charting Library Integration

**Setup TradingView Charting Library:**
```bash
cd frontend
npm install lightweight-charts
npm install d3 @types/d3
npm install react-use-measure
npm install date-fns
```

### 1.2 Core Chart Components

#### **Advanced Candlestick Chart** (`components/charts/CandlestickChart.tsx`):
```typescript
'use client'

import { useRef, useEffect, useState } from 'react'
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts'
import { Card } from '@/components/ui/card'

interface CandlestickChartProps {
  data: CandlestickData<Time>[]
  symbol: string
  className?: string
  height?: number
}

export function CandlestickChart({ 
  data, 
  symbol, 
  className,
  height = 400 
}: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart with Dark Space Purple theme
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height,
      layout: {
        background: {
          color: '#0F0F23', // Dark Space Purple background
        },
        textColor: '#E5E7EB',
      },
      grid: {
        vertLines: {
          color: 'rgba(45, 45, 74, 0.5)',
        },
        horzLines: {
          color: 'rgba(45, 45, 74, 0.5)',
        },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: '#C084FC',
          width: 1,
          style: 2,
        },
        horzLine: {
          color: '#C084FC',
          width: 1,
          style: 2,
        },
      },
      rightPriceScale: {
        borderColor: '#404066',
        textColor: '#9CA3AF',
      },
      timeScale: {
        borderColor: '#404066',
        textColor: '#9CA3AF',
        timeVisible: true,
        secondsVisible: false,
      },
      watermark: {
        visible: true,
        fontSize: 24,
        horzAlign: 'center',
        vertAlign: 'center',
        color: 'rgba(192, 132, 252, 0.1)',
        text: symbol,
      },
    })

    // Create candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10B981', // Success green
      downColor: '#EF4444', // Danger red
      borderUpColor: '#10B981',
      borderDownColor: '#EF4444',
      wickUpColor: '#10B981',
      wickDownColor: '#EF4444',
    })

    chartRef.current = chart
    seriesRef.current = candlestickSeries

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartRef.current) {
        chartRef.current.remove()
      }
    }
  }, [height, symbol])

  useEffect(() => {
    if (seriesRef.current && data.length > 0) {
      seriesRef.current.setData(data)
      if (chartRef.current) {
        chartRef.current.timeScale().fitContent()
      }
    }
  }, [data])

  return (
    <Card variant="glass" className={className}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">{symbol} Chart</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-muted">TradingView Style</span>
          </div>
        </div>
        <div 
          ref={chartContainerRef} 
          className="w-full rounded-md overflow-hidden"
          style={{ height: `${height}px` }}
        />
      </div>
    </Card>
  )
}
```

#### **Technical Indicators Component** (`components/charts/TechnicalIndicators.tsx`):
```typescript
'use client'

import { useMemo } from 'react'
import { LineData, Time } from 'lightweight-charts'

// Simple Moving Average calculation
export function calculateSMA(data: number[], period: number): number[] {
  const sma: number[] = []
  
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(NaN)
    } else {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0)
      sma.push(sum / period)
    }
  }
  
  return sma
}

// Exponential Moving Average calculation
export function calculateEMA(data: number[], period: number): number[] {
  const ema: number[] = []
  const multiplier = 2 / (period + 1)
  
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      ema.push(data[i])
    } else {
      ema.push((data[i] * multiplier) + (ema[i - 1] * (1 - multiplier)))
    }
  }
  
  return ema
}

// RSI calculation
export function calculateRSI(prices: number[], period = 14): number[] {
  const rsi: number[] = []
  const gains: number[] = []
  const losses: number[] = []
  
  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1]
    gains.push(change > 0 ? change : 0)
    losses.push(change < 0 ? Math.abs(change) : 0)
  }
  
  for (let i = 0; i < gains.length; i++) {
    if (i < period - 1) {
      rsi.push(NaN)
    } else {
      const avgGain = gains.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period
      const avgLoss = losses.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period
      
      if (avgLoss === 0) {
        rsi.push(100)
      } else {
        const rs = avgGain / avgLoss
        rsi.push(100 - (100 / (1 + rs)))
      }
    }
  }
  
  return [NaN, ...rsi] // Add NaN for first price point
}

// MACD calculation
export function calculateMACD(prices: number[], fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
  const fastEMA = calculateEMA(prices, fastPeriod)
  const slowEMA = calculateEMA(prices, slowPeriod)
  
  const macdLine = fastEMA.map((fast, i) => fast - slowEMA[i])
  const signalLine = calculateEMA(macdLine.filter(val => !isNaN(val)), signalPeriod)
  const histogram = macdLine.map((macd, i) => macd - (signalLine[i] || 0))
  
  return {
    macdLine,
    signalLine: [
      ...new Array(macdLine.length - signalLine.length).fill(NaN),
      ...signalLine
    ],
    histogram
  }
}

// Hook for preparing indicator data for charts
export function useIndicatorData(
  prices: number[], 
  timestamps: Time[], 
  indicators: string[]
) {
  return useMemo(() => {
    const result: Record<string, LineData<Time>[]> = {}
    
    if (indicators.includes('SMA20')) {
      const sma20 = calculateSMA(prices, 20)
      result.SMA20 = timestamps.map((time, i) => ({
        time,
        value: sma20[i]
      })).filter(item => !isNaN(item.value))
    }
    
    if (indicators.includes('SMA50')) {
      const sma50 = calculateSMA(prices, 50)
      result.SMA50 = timestamps.map((time, i) => ({
        time,
        value: sma50[i]
      })).filter(item => !isNaN(item.value))
    }
    
    if (indicators.includes('EMA12')) {
      const ema12 = calculateEMA(prices, 12)
      result.EMA12 = timestamps.map((time, i) => ({
        time,
        value: ema12[i]
      })).filter(item => !isNaN(item.value))
    }
    
    if (indicators.includes('RSI')) {
      const rsi = calculateRSI(prices)
      result.RSI = timestamps.map((time, i) => ({
        time,
        value: rsi[i]
      })).filter(item => !isNaN(item.value))
    }
    
    return result
  }, [prices, timestamps, indicators])
}
```

### 1.3 Advanced Chart Features

#### **Multi-Timeframe Chart** (`components/charts/MultiTimeframeChart.tsx`):
```typescript
'use client'

import { useState, useEffect } from 'react'
import { CandlestickChart } from './CandlestickChart'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w'

interface MultiTimeframeChartProps {
  symbol: string
  onTimeframeChange?: (timeframe: Timeframe) => void
}

export function MultiTimeframeChart({ 
  symbol, 
  onTimeframeChange 
}: MultiTimeframeChartProps) {
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('1h')
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const timeframes: { label: string; value: Timeframe }[] = [
    { label: '1m', value: '1m' },
    { label: '5m', value: '5m' },
    { label: '15m', value: '15m' },
    { label: '1h', value: '1h' },
    { label: '4h', value: '4h' },
    { label: '1D', value: '1d' },
    { label: '1W', value: '1w' },
  ]

  const handleTimeframeChange = (timeframe: Timeframe) => {
    setActiveTimeframe(timeframe)
    onTimeframeChange?.(timeframe)
    fetchChartData(timeframe)
  }

  const fetchChartData = async (timeframe: Timeframe) => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch(`/api/market/chart/${symbol}?timeframe=${timeframe}`)
      // const data = await response.json()
      
      // Mock data for development
      const mockData = generateMockCandlestickData(100, timeframe)
      setChartData(mockData)
    } catch (error) {
      console.error('Failed to fetch chart data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChartData(activeTimeframe)
  }, [symbol])

  return (
    <div className="space-y-4">
      {/* Timeframe Selector */}
      <Card variant="glass" className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">
            {symbol} - Advanced Chart
          </h3>
          <div className="flex items-center space-x-1">
            {timeframes.map((tf) => (
              <Button
                key={tf.value}
                variant={activeTimeframe === tf.value ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleTimeframeChange(tf.value)}
                className="min-w-[3rem]"
              >
                {tf.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Chart */}
      {isLoading ? (
        <Card variant="glass" className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            <span className="ml-2 text-text-muted">Loading chart data...</span>
          </div>
        </Card>
      ) : (
        <CandlestickChart 
          data={chartData} 
          symbol={symbol}
          height={500}
        />
      )}
    </div>
  )
}

// Mock data generator for development
function generateMockCandlestickData(count: number, timeframe: Timeframe) {
  const data = []
  let time = Math.floor(Date.now() / 1000) - (count * getTimeframeSeconds(timeframe))
  let price = 100 + Math.random() * 50
  
  for (let i = 0; i < count; i++) {
    const open = price
    const volatility = 2 + Math.random() * 3
    const high = open + Math.random() * volatility
    const low = open - Math.random() * volatility
    const close = low + Math.random() * (high - low)
    
    data.push({
      time: time as any,
      open,
      high,
      low,
      close,
    })
    
    price = close + (Math.random() - 0.5) * 2
    time += getTimeframeSeconds(timeframe)
  }
  
  return data
}

function getTimeframeSeconds(timeframe: Timeframe): number {
  const seconds = {
    '1m': 60,
    '5m': 300,
    '15m': 900,
    '1h': 3600,
    '4h': 14400,
    '1d': 86400,
    '1w': 604800,
  }
  return seconds[timeframe]
}
```

---

## 📋 Phase 2: Interactive Economic World Maps (Week 2-3)

### 2.1 World Map Component with D3.js

#### **Interactive Economic Map** (`components/maps/EconomicWorldMap.tsx`):
```typescript
'use client'

import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CountryData {
  country: string
  countryCode: string
  value: number
  indicator: string
  period: string
}

interface EconomicWorldMapProps {
  indicator: 'inflation' | 'unemployment' | 'gdp_growth' | 'interest_rate'
  data: CountryData[]
  className?: string
}

export function EconomicWorldMap({ 
  indicator, 
  data, 
  className 
}: EconomicWorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const indicatorConfig = {
    inflation: {
      title: 'Inflation Rate (%)',
      color: '#EF4444', // Red for inflation
      scale: [0, 15],
    },
    unemployment: {
      title: 'Unemployment Rate (%)',
      color: '#F59E0B', // Orange for unemployment
      scale: [0, 25],
    },
    gdp_growth: {
      title: 'GDP Growth Rate (%)',
      color: '#10B981', // Green for growth
      scale: [-5, 10],
    },
    interest_rate: {
      title: 'Interest Rate (%)',
      color: '#C084FC', // Purple for interest rates
      scale: [0, 20],
    },
  }

  const config = indicatorConfig[indicator]

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    const svg = d3.select(svgRef.current)
    const width = 960
    const height = 500

    // Clear previous content
    svg.selectAll('*').remove()

    // Create projection and path generator
    const projection = d3.geoNaturalEarth1()
      .scale(150)
      .translate([width / 2, height / 2])

    const path = d3.geoPath().projection(projection)

    // Create color scale
    const colorScale = d3.scaleSequential()
      .domain(config.scale)
      .interpolator(d3.interpolateRgb('#1A1A2E', config.color))

    // Create tooltip
    const tooltip = d3.select(tooltipRef.current)

    // Load world map data and render
    d3.json('https://unpkg.com/world-atlas@3/countries-50m.json')
      .then((world: any) => {
        const countries = world.objects.countries

        // Convert data to map for quick lookup
        const dataMap = new Map(
          data.map(d => [d.countryCode.toLowerCase(), d])
        )

        // Draw countries
        svg.selectAll('path')
          .data(topojson.feature(world, countries).features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('class', 'country')
          .attr('fill', (d: any) => {
            const countryData = dataMap.get(d.id.toLowerCase())
            return countryData ? colorScale(countryData.value) : '#2D2D4A'
          })
          .attr('stroke', '#404066')
          .attr('stroke-width', 0.5)
          .style('cursor', 'pointer')
          .on('mouseover', function(event, d: any) {
            const countryData = dataMap.get(d.id.toLowerCase())
            
            // Highlight country
            d3.select(this)
              .attr('stroke', '#C084FC')
              .attr('stroke-width', 2)

            // Show tooltip
            if (countryData) {
              tooltip
                .style('opacity', 1)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px')
                .html(`
                  <div class="bg-surface-glass border border-border-light rounded-lg p-3 text-sm">
                    <div class="font-semibold text-text-primary">${countryData.country}</div>
                    <div class="text-text-secondary">${config.title}</div>
                    <div class="text-accent font-medium">${countryData.value.toFixed(2)}%</div>
                    <div class="text-text-muted text-xs mt-1">Period: ${countryData.period}</div>
                  </div>
                `)
            }
          })
          .on('mouseout', function() {
            // Remove highlight
            d3.select(this)
              .attr('stroke', '#404066')
              .attr('stroke-width', 0.5)

            // Hide tooltip
            tooltip.style('opacity', 0)
          })
          .on('click', function(event, d: any) {
            const countryData = dataMap.get(d.id.toLowerCase())
            if (countryData) {
              setSelectedCountry(countryData.country)
            }
          })

        // Add legend
        const legendWidth = 300
        const legendHeight = 20
        const legendX = width - legendWidth - 20
        const legendY = height - 40

        const legendScale = d3.scaleLinear()
          .domain(config.scale)
          .range([0, legendWidth])

        const legendAxis = d3.axisBottom(legendScale)
          .tickSize(6)
          .tickFormat(d => `${d}%`)

        // Legend gradient
        const defs = svg.append('defs')
        const gradient = defs.append('linearGradient')
          .attr('id', `legend-gradient-${indicator}`)
          .attr('x1', '0%')
          .attr('x2', '100%')

        gradient.selectAll('stop')
          .data(d3.range(0, 1.1, 0.1))
          .enter()
          .append('stop')
          .attr('offset', d => `${d * 100}%`)
          .attr('stop-color', d => colorScale(config.scale[0] + d * (config.scale[1] - config.scale[0])))

        // Legend rectangle
        svg.append('rect')
          .attr('x', legendX)
          .attr('y', legendY)
          .attr('width', legendWidth)
          .attr('height', legendHeight)
          .attr('fill', `url(#legend-gradient-${indicator})`)
          .attr('stroke', '#404066')

        // Legend axis
        svg.append('g')
          .attr('transform', `translate(${legendX}, ${legendY + legendHeight})`)
          .call(legendAxis)
          .selectAll('text')
          .attr('fill', '#9CA3AF')
          .style('font-size', '12px')

        // Legend title
        svg.append('text')
          .attr('x', legendX)
          .attr('y', legendY - 5)
          .attr('fill', '#E5E7EB')
          .style('font-size', '14px')
          .style('font-weight', 'bold')
          .text(config.title)
      })
      .catch(error => {
        console.error('Error loading world map:', error)
      })

  }, [indicator, data, config])

  return (
    <Card variant="glass" className={className}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-text-primary">
            Global {config.title}
          </h3>
          <div className="text-sm text-text-muted">
            Click on a country for details
          </div>
        </div>
        
        <div className="relative">
          <svg
            ref={svgRef}
            width="100%"
            height={500}
            viewBox="0 0 960 500"
            className="w-full h-auto"
          >
          </svg>
          
          <div
            ref={tooltipRef}
            className="absolute pointer-events-none opacity-0 transition-opacity z-10"
          />
        </div>

        {selectedCountry && (
          <div className="mt-4 p-4 bg-surface-hover rounded-lg border border-border">
            <h4 className="font-semibold text-text-primary mb-2">
              {selectedCountry} - Economic Details
            </h4>
            <div className="text-sm text-text-secondary">
              Additional economic indicators and trends would be displayed here.
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
```

### 2.2 Economic Dashboard with Multiple Indicators

#### **Economic Dashboard** (`components/maps/EconomicDashboard.tsx`):
```typescript
'use client'

import { useState, useEffect } from 'react'
import { EconomicWorldMap } from './EconomicWorldMap'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type Indicator = 'inflation' | 'unemployment' | 'gdp_growth' | 'interest_rate'

interface EconomicDashboardProps {
  className?: string
}

export function EconomicDashboard({ className }: EconomicDashboardProps) {
  const [activeIndicator, setActiveIndicator] = useState<Indicator>('inflation')
  const [economicData, setEconomicData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const indicators = [
    { 
      id: 'inflation' as Indicator, 
      label: 'Inflation', 
      icon: '📈',
      description: 'Annual inflation rate by country'
    },
    { 
      id: 'unemployment' as Indicator, 
      label: 'Unemployment', 
      icon: '👥',
      description: 'Unemployment rate by country'
    },
    { 
      id: 'gdp_growth' as Indicator, 
      label: 'GDP Growth', 
      icon: '💹',
      description: 'Annual GDP growth rate'
    },
    { 
      id: 'interest_rate' as Indicator, 
      label: 'Interest Rates', 
      icon: '🏛️',
      description: 'Central bank interest rates'
    },
  ]

  const fetchEconomicData = async (indicator: Indicator) => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch(`/api/economic/${indicator}`)
      // const data = await response.json()
      
      // Mock data for development
      const mockData = generateMockEconomicData(indicator)
      setEconomicData(mockData)
    } catch (error) {
      console.error('Failed to fetch economic data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEconomicData(activeIndicator)
  }, [activeIndicator])

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Indicator Selector */}
      <Card variant="glass" className="p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Global Economic Indicators
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {indicators.map((indicator) => (
            <Button
              key={indicator.id}
              variant={activeIndicator === indicator.id ? 'primary' : 'secondary'}
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => setActiveIndicator(indicator.id)}
            >
              <span className="text-2xl mb-1">{indicator.icon}</span>
              <span className="font-medium">{indicator.label}</span>
              <span className="text-xs text-center mt-1 opacity-75">
                {indicator.description}
              </span>
            </Button>
          ))}
        </div>
      </Card>

      {/* World Map */}
      {isLoading ? (
        <Card variant="glass" className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            <span className="ml-2 text-text-muted">Loading global data...</span>
          </div>
        </Card>
      ) : (
        <EconomicWorldMap 
          indicator={activeIndicator}
          data={economicData}
        />
      )}

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="glass" className="p-4">
          <div className="text-center">
            <p className="text-sm text-text-muted">Global Average</p>
            <p className="text-2xl font-bold text-accent">
              {calculateAverage(economicData).toFixed(2)}%
            </p>
          </div>
        </Card>
        
        <Card variant="glass" className="p-4">
          <div className="text-center">
            <p className="text-sm text-text-muted">Highest</p>
            <p className="text-2xl font-bold text-danger">
              {Math.max(...economicData.map((d: any) => d.value)).toFixed(2)}%
            </p>
          </div>
        </Card>
        
        <Card variant="glass" className="p-4">
          <div className="text-center">
            <p className="text-sm text-text-muted">Lowest</p>
            <p className="text-2xl font-bold text-success">
              {Math.min(...economicData.map((d: any) => d.value)).toFixed(2)}%
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Mock data generator for development
function generateMockEconomicData(indicator: Indicator) {
  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'de', name: 'Germany' },
    { code: 'jp', name: 'Japan' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'fr', name: 'France' },
    { code: 'cn', name: 'China' },
    { code: 'in', name: 'India' },
    { code: 'br', name: 'Brazil' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    // Add more countries as needed
  ]

  const ranges = {
    inflation: [0, 12],
    unemployment: [2, 20],
    gdp_growth: [-3, 8],
    interest_rate: [0, 15],
  }

  const [min, max] = ranges[indicator]

  return countries.map(country => ({
    country: country.name,
    countryCode: country.code,
    indicator,
    value: min + Math.random() * (max - min),
    period: '2024-Q3',
  }))
}

function calculateAverage(data: any[]): number {
  if (!data.length) return 0
  const sum = data.reduce((acc, item) => acc + item.value, 0)
  return sum / data.length
}
```

---

## 📋 Phase 3: Portfolio Visualization & Analytics (Week 3-4)

### 3.1 Portfolio Performance Charts

#### **Portfolio Performance Chart** (`components/charts/PortfolioChart.tsx`):
```typescript
'use client'

import { useRef, useEffect } from 'react'
import { createChart, IChartApi, LineData, Time } from 'lightweight-charts'
import { Card } from '@/components/ui/card'

interface PortfolioChartProps {
  portfolioData: LineData<Time>[]
  benchmarkData?: LineData<Time>[]
  portfolioName: string
  className?: string
}

export function PortfolioChart({ 
  portfolioData, 
  benchmarkData, 
  portfolioName,
  className 
}: PortfolioChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartContainerRef.current || !portfolioData.length) return

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: '#0F0F23' },
        textColor: '#E5E7EB',
      },
      grid: {
        vertLines: { color: 'rgba(45, 45, 74, 0.5)' },
        horzLines: { color: 'rgba(45, 45, 74, 0.5)' },
      },
      crosshair: {
        mode: 1,
        vertLine: { color: '#C084FC', width: 1, style: 2 },
        horzLine: { color: '#C084FC', width: 1, style: 2 },
      },
      rightPriceScale: {
        borderColor: '#404066',
        textColor: '#9CA3AF',
      },
      timeScale: {
        borderColor: '#404066',
        textColor: '#9CA3AF',
      },
    })

    // Portfolio performance line
    const portfolioSeries = chart.addLineSeries({
      color: '#C084FC',
      lineWidth: 3,
      title: portfolioName,
    })
    portfolioSeries.setData(portfolioData)

    // Benchmark line (if provided)
    if (benchmarkData && benchmarkData.length > 0) {
      const benchmarkSeries = chart.addLineSeries({
        color: '#6B7280',
        lineWidth: 2,
        lineStyle: 2, // Dashed line
        title: 'S&P 500',
      })
      benchmarkSeries.setData(benchmarkData)
    }

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [portfolioData, benchmarkData, portfolioName])

  return (
    <Card variant="glass" className={className}>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Portfolio Performance vs Benchmark
        </h3>
        <div 
          ref={chartContainerRef} 
          className="w-full"
        />
      </div>
    </Card>
  )
}
```

### 3.2 Asset Allocation Visualization

#### **Asset Allocation Donut Chart** (`components/charts/AssetAllocationChart.tsx`):
```typescript
'use client'

import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { Card } from '@/components/ui/card'

interface AssetData {
  symbol: string
  name: string
  value: number
  allocation: number
  color: string
}

interface AssetAllocationChartProps {
  assets: AssetData[]
  totalValue: number
  className?: string
}

export function AssetAllocationChart({ 
  assets, 
  totalValue,
  className 
}: AssetAllocationChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !assets.length) return

    const svg = d3.select(svgRef.current)
    const width = 400
    const height = 400
    const radius = Math.min(width, height) / 2 - 40

    // Clear previous content
    svg.selectAll('*').remove()

    // Create container group
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    // Create pie generator
    const pie = d3.pie<AssetData>()
      .value(d => d.allocation)
      .sort(null)

    // Create arc generator
    const arc = d3.arc<d3.PieArcDatum<AssetData>>()
      .innerRadius(radius * 0.6) // Donut chart
      .outerRadius(radius)

    const labelArc = d3.arc<d3.PieArcDatum<AssetData>>()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 0.8)

    // Generate pie data
    const pieData = pie(assets)

    // Create slices
    const slices = g.selectAll('.slice')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'slice')

    // Add paths
    slices.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', '#0F0F23')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', function() {
            const centroid = arc.centroid(d)
            return `translate(${centroid[0] * 0.1}, ${centroid[1] * 0.1})`
          })
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', 'translate(0, 0)')
      })

    // Add labels
    slices.append('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#E5E7EB')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => d.data.allocation > 5 ? `${d.data.allocation.toFixed(1)}%` : '')

    // Add center text (total value)
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .attr('fill', '#E5E7EB')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .text(`$${(totalValue / 1000).toFixed(1)}K`)

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .attr('fill', '#9CA3AF')
      .style('font-size', '14px')
      .text('Total Value')

  }, [assets, totalValue])

  return (
    <Card variant="glass" className={className}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Asset Allocation
        </h3>
        
        <div className="flex items-center">
          <svg
            ref={svgRef}
            width={400}
            height={400}
            className="flex-shrink-0"
          />
          
          <div className="ml-6 space-y-3 flex-1">
            {assets.map((asset, index) => (
              <div key={asset.symbol} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded mr-3"
                  style={{ backgroundColor: asset.color }}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-text-primary">
                      {asset.symbol}
                    </span>
                    <span className="text-text-secondary">
                      {asset.allocation.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-sm text-text-muted">
                    {asset.name}
                  </div>
                  <div className="text-sm font-medium text-accent">
                    ${asset.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
```

---

## ✅ Definition of Done

### **Advanced Trading Charts:**
- [ ] **TradingView Integration**: Lightweight Charts library properly integrated
- [ ] **Candlestick Charts**: Real-time candlestick charts with Dark Space Purple theme
- [ ] **Technical Indicators**: SMA, EMA, RSI, MACD calculations and overlays
- [ ] **Multi-Timeframe**: 1m, 5m, 15m, 1h, 4h, 1d, 1w timeframe switching
- [ ] **Interactive Features**: Zoom, pan, crosshair, tooltips
- [ ] **Performance**: Smooth rendering with large datasets (1000+ data points)
- [ ] **Responsive Design**: Charts adapt to different screen sizes

### **Interactive World Maps:**
- [ ] **D3.js Integration**: World map with proper projection and styling
- [ ] **Economic Indicators**: Inflation, unemployment, GDP growth, interest rates
- [ ] **Color Coding**: Meaningful color scales for data representation
- [ ] **Interactivity**: Hover effects, tooltips, click events
- [ ] **Multiple Indicators**: Seamless switching between economic indicators
- [ ] **Data Visualization**: Clear legends, scales, and labels
- [ ] **Performance**: Smooth interactions with 200+ countries

### **Portfolio Visualization:**
- [ ] **Performance Charts**: Portfolio vs benchmark comparison charts
- [ ] **Asset Allocation**: Interactive donut charts with detailed breakdowns
- [ ] **Real-time Updates**: Charts update with live data changes
- [ ] **Multiple Portfolios**: Support for comparing different portfolios
- [ ] **Historical Analysis**: Time-series portfolio performance tracking
- [ ] **Risk Metrics**: Visualization of portfolio risk indicators

### **Code Quality:**
- [ ] **TypeScript**: Strict typing with no any types
- [ ] **Performance**: Optimized rendering for complex visualizations
- [ ] **Memory Management**: Proper cleanup of D3/chart instances
- [ ] **Error Handling**: Graceful handling of data loading failures
- [ ] **Accessibility**: Proper ARIA labels and keyboard navigation
- [ ] **Testing**: Visual regression tests for chart components

### **Integration:**
- [ ] **API Ready**: Components work with backend economic/market data APIs
- [ ] **Real-time Data**: WebSocket integration for live chart updates
- [ ] **Shared Types**: Uses shared TypeScript interfaces
- [ ] **Theme Consistency**: All visualizations follow Dark Space Purple theme
- [ ] **Mobile Responsive**: Charts work properly on mobile devices

---

## 🚀 Success Criteria

**After completion, you will have delivered:**

1. ✅ **TradingView-level Chart System** with advanced technical analysis
2. ✅ **Interactive Economic World Maps** with real-time global data
3. ✅ **Portfolio Analytics Dashboard** with comprehensive visualizations
4. ✅ **Multi-timeframe Trading Charts** (1m to 1w intervals)
5. ✅ **Technical Indicators Library** (SMA, EMA, RSI, MACD, etc.)
6. ✅ **Global Economic Visualization** for 4+ key indicators
7. ✅ **Asset Allocation Charts** with interactive breakdowns
8. ✅ **Performance Comparison Tools** (portfolio vs benchmarks)
9. ✅ **Real-time Data Integration** with WebSocket support
10. ✅ **Mobile-Responsive Design** for all visualizations

**Timeline**: 3-4 weeks
**Next Phase**: Advanced analytics, custom indicators, and mobile optimization

---

## 📞 Communication & Support

- **Daily commits**: Document visualization progress and chart implementations
- **Pull requests**: Create PR when major chart features are complete
- **Conventional commits**: Use `feat:`, `fix:`, `style:`, `perf:` prefixes
- **Performance Focus**: Optimize for smooth interactions with large datasets
- **Visual Documentation**: Include screenshots of charts and maps in commits
- **Cross-browser Testing**: Test visualizations in Chrome, Firefox, Safari, Edge

**Repository**: https://github.com/xrey167/finx-webside
**Branch**: `feature/data-visualization`
**Working Directory**: `/frontend/components/charts/` and `/frontend/components/maps/`

🚀 **Ready to create stunning financial data visualizations!**