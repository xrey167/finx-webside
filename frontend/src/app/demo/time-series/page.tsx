"use client";

import TimeSeriesChart, { Candle, Trade } from "@/components/charts/TimeSeriesChart";
import { getIndicator } from "@/components/charts/indicators/registry";

const now = Date.now();
const candles: Candle[] = Array.from({ length: 120 }).map((_, i) => {
  const ts = now - (120 - i) * 60 * 60 * 1000;
  const open = 100 + Math.sin(i / 5) * 3 + i * 0.05;
  const close = open + (Math.random() - 0.5) * 2;
  const low = Math.min(open, close) - Math.random() * 1.5;
  const high = Math.max(open, close) + Math.random() * 1.5;
  return [ts, +open.toFixed(2), +close.toFixed(2), +low.toFixed(2), +high.toFixed(2)];
});

const baseLine = candles.map((c) => [c[0], c[2]] as [number, number]);
const sma = getIndicator("SMA")!(baseLine, { period: 10 });

const trades: Trade[] = [
  { time: candles[20][0], price: candles[20][2], side: "buy", qty: 1, note: "Entry" },
  { time: candles[40][0], price: candles[40][2], side: "sell", qty: 1, note: "Exit" },
];

export default function Page() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-accent">Time Series</h1>
      <TimeSeriesChart title="Asset Price" candles={candles} indicators={[sma]} trades={trades} />
    </main>
  );
}
