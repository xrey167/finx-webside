"use client";

import DonutPortfolioChart from "@/components/charts/DonutPortfolioChart";

export default function Page() {
  const data = [
    { name: "AAPL", value: 35, color: "#C084FC" },
    { name: "MSFT", value: 25, color: "#8B5CF6" },
    { name: "GOOGL", value: 20, color: "#22d3ee" },
    { name: "Bonds", value: 12, color: "#10b981" },
    { name: "Cash", value: 8, color: "#f59e0b" },
  ];
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-accent">Portfolio</h1>
      <DonutPortfolioChart title="Aktuelle Positionen" data={data} />
    </main>
  );
}
