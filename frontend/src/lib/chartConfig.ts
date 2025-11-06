import { formatCurrency, formatPercent } from "@/lib/utils";
import type { MarketQuote } from "@/hooks/useMarketData";

export type ChartTheme = "positive" | "negative" | "neutral";

export interface SparklinePoint {
  name: string;
  value: number;
  changePercent: number;
}

export interface SparklineConfig {
  stroke: string;
  gradientFrom: string;
  gradientTo: string;
  fillOpacity: number;
}

export const sparklineThemes: Record<ChartTheme, SparklineConfig> = {
  positive: {
    stroke: "#12B76A",
    gradientFrom: "rgba(18, 183, 106, 0.24)",
    gradientTo: "rgba(18, 183, 106, 0.05)",
    fillOpacity: 0.5,
  },
  negative: {
    stroke: "#F04438",
    gradientFrom: "rgba(240, 68, 56, 0.24)",
    gradientTo: "rgba(240, 68, 56, 0.05)",
    fillOpacity: 0.5,
  },
  neutral: {
    stroke: "#3B82F6",
    gradientFrom: "rgba(59, 130, 246, 0.24)",
    gradientTo: "rgba(59, 130, 246, 0.05)",
    fillOpacity: 0.5,
  },
};

export function resolveTheme(changePercent: number | undefined): ChartTheme {
  if (changePercent === undefined) return "neutral";
  if (changePercent > 0.25) return "positive";
  if (changePercent < -0.25) return "negative";
  return "neutral";
}

export function buildSparklineSeries(
  quotes: MarketQuote[],
  limit = 30
): SparklinePoint[] {
  if (!quotes.length) return [];

  const slice = quotes
    .slice(0, limit)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return slice.map((quote) => ({
    name: new Date(quote.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: quote.price,
    changePercent: quote.changePercent,
  }));
}

export function createTooltipFormatter(currency = "USD") {
  return (value: number) => formatCurrency(value, currency);
}

export function createChangeFormatter() {
  return (value: number) => formatPercent(value);
}

export function summarizeQuote(quote: MarketQuote) {
  return {
    priceLabel: formatCurrency(quote.price),
    changeLabel: formatPercent(quote.changePercent),
    volume: Number.isNaN(Number(quote.volume))
      ? quote.volume
      : new Intl.NumberFormat("en-US", { notation: "compact" }).format(
          Number(quote.volume)
        ),
    high: quote.high24h ? formatCurrency(quote.high24h) : undefined,
    low: quote.low24h ? formatCurrency(quote.low24h) : undefined,
    updatedAt: new Date(quote.timestamp).toLocaleString(),
  };
}
