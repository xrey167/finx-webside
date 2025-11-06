"use client";

import { useMemo } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
};

type ApiError = {
  success: false;
  error: string;
  timestamp: string;
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface MarketQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap?: string;
  high24h?: number;
  low24h?: number;
  timestamp: string;
  source: string;
}

export interface EconomicIndicator {
  id: number;
  country: string;
  countryCode: string;
  indicator: string;
  value: number;
  unit: string;
  period: string;
  timestamp: string;
  source: string;
}

const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api").replace(/\/$/, "");

async function fetchFromApi<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload: ApiResponse<T> = await response.json();

  if (!payload.success || !("data" in payload)) {
    throw new Error((payload as ApiError).error ?? "API error");
  }

  return payload.data as T;
}

export function useMarketQuotes(
  symbols: string[],
  options?: { enabled?: boolean; refetchInterval?: number }
): UseQueryResult<MarketQuote[]> {
  const normalizedSymbols = useMemo(
    () => symbols.map((symbol) => symbol.trim().toUpperCase()).filter(Boolean),
    [symbols]
  );

  const enabled = (options?.enabled ?? true) && normalizedSymbols.length > 0;

  return useQuery({
    queryKey: ["market", "quotes", normalizedSymbols.join(",")],
    queryFn: () => {
      const params = new URLSearchParams({
        symbols: normalizedSymbols.join(","),
      });
      return fetchFromApi<MarketQuote[]>(`/market/quotes?${params.toString()}`);
    },
    enabled,
    staleTime: 60_000,
    refetchInterval: options?.refetchInterval ?? 60_000,
  });
}

export function useMarketSymbols(options?: {
  enabled?: boolean;
}): UseQueryResult<string[]> {
  return useQuery({
    queryKey: ["market", "symbols"],
    queryFn: () => fetchFromApi<string[]>("/market/symbols"),
    staleTime: 5 * 60_000,
    enabled: options?.enabled ?? true,
  });
}

export function useEconomicIndicators(
  params: { countryCode?: string; indicator?: string },
  options?: { enabled?: boolean }
): UseQueryResult<EconomicIndicator[]> {
  const enabled = options?.enabled ?? true;

  return useQuery({
    queryKey: ["market", "economic-indicators", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params.countryCode) searchParams.set("countryCode", params.countryCode);
      if (params.indicator) searchParams.set("indicator", params.indicator);

      const query = searchParams.toString();
      const suffix = query ? `?${query}` : "";

      return fetchFromApi<EconomicIndicator[]>(
        `/market/economic-indicators${suffix}`
      );
    },
    enabled,
    staleTime: 10 * 60_000,
  });
}
