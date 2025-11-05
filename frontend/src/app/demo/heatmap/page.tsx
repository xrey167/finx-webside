"use client";

import HeatmapChart from "@/components/charts/HeatmapChart";

const symbols = ["USD", "EUR", "JPY", "GBP", "CHF", "AUD", "CAD"];

// mock symmetric correlation matrix values in [-1,1]
const cells = symbols.flatMap((x) =>
  symbols.map((y) => ({ x, y, value: x === y ? 1 : +(Math.cos((x.charCodeAt(0) + y.charCodeAt(0)) / 5) * 0.8).toFixed(2) }))
);

export default function Page() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-accent">Forex Correlation</h1>
      <HeatmapChart title="Correlation Matrix" xLabels={symbols} yLabels={symbols} cells={cells} valueFormatter={(v) => v.toFixed(2)} />
    </main>
  );
}
