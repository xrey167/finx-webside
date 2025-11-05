"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import type { EChartsOption, SeriesOption } from "echarts";

// ECharts requires DOM; load client-side only
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export type Candle = [number, number, number, number, number]; // [ts, open, close, low, high]

export type Trade = {
  time: number;
  price: number;
  side: "buy" | "sell";
  qty?: number;
  note?: string;
};

export type IndicatorSeries = {
  name: string;
  points: Array<[number, number]>; // [ts, value]
  color?: string;
  lineStyle?: {
    width?: number;
    type?: "solid" | "dashed" | "dotted";
  };
};

export type TimeSeriesChartProps = {
  title?: string;
  candles?: Candle[]; // optional candlesticks
  line?: Array<[number, number]>; // optional line series for close/equity
  indicators?: IndicatorSeries[];
  trades?: Trade[];
  height?: number | string;
};

export default function TimeSeriesChart({
  title,
  candles,
  line,
  indicators = [],
  trades = [],
  height = 420,
}: TimeSeriesChartProps) {
  const option: EChartsOption = useMemo(() => {

    const series: SeriesOption[] = [];

    if (candles?.length) {
      series.push({
        type: "candlestick",
        name: "Price",
        data: candles.map((c) => [c[1], c[2], c[3], c[4]]),
        itemStyle: {
          color: "#22c55e",
          color0: "#ef4444",
          borderColor: "#22c55e",
          borderColor0: "#ef4444",
        },
      });
    }

    if (line?.length) {
      series.push({
        type: "line",
        name: "Line",
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 2, color: "var(--accent)" },
        data: line,
      });
    }

    indicators.forEach((ind) => {
      series.push({
        type: "line",
        name: ind.name,
        showSymbol: false,
        smooth: true,
        lineStyle: {
          width: ind.lineStyle?.width ?? 1,
          type: ind.lineStyle?.type ?? "solid",
          color: ind.color ?? "#60a5fa",
        },
        data: ind.points,
      });
    });

    if (trades.length) {
      series.push({
        type: "scatter",
        name: "Trades",
        symbolSize: 8,
        data: trades.map((t) => ({
          value: [t.time, t.price],
          itemStyle: { color: t.side === "buy" ? "#22c55e" : "#ef4444" },
          tooltip: { valueFormatter: (v: unknown) => String(v) },
        })),
      });
    }

    return {
      backgroundColor: "transparent",
      title: title ? { text: title, textStyle: { color: "#EDEDED" } } : undefined,
      tooltip: { trigger: "axis" },
      grid: { left: 40, right: 16, top: 32, bottom: 40 },
      xAxis: {
        type: "time",
        boundaryGap: false,
        axisLine: { lineStyle: { color: "#6b7280" } },
        axisLabel: { color: "#9ca3af" },
      },
      yAxis: {
        type: "value",
        scale: true,
        axisLine: { lineStyle: { color: "#6b7280" } },
        axisLabel: { color: "#9ca3af" },
        splitLine: { lineStyle: { color: "#1f2937" } },
      },
      series,
    } as EChartsOption;
  }, [title, candles, line, indicators, trades]);

  return (
    <div className="w-full" style={{ height }}>
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
