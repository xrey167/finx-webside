"use client";

import EquityCurveChart from "@/components/charts/EquityCurveChart";

const now = Date.now();
const data = Array.from({ length: 200 }).map((_, i) => {
  const ts = now - (200 - i) * 24 * 60 * 60 * 1000;
  const v = 10000 + i * 15 + Math.sin(i / 8) * 120 + (Math.random() - 0.5) * 80;
  return [ts, Math.round(v)] as [number, number];
});

export default function Page() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-accent">Equity Curve</h1>
      <EquityCurveChart data={data} />
    </main>
  );
}
