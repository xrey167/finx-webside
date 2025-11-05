import Link from "next/link";

export default function DemoIndex() {
  const links = [
    { href: "/demo/time-series", label: "Time Series (Price + Trades + Indicators)" },
    { href: "/demo/portfolio", label: "Portfolio Donut" },
    { href: "/demo/equity", label: "Equity Curve" },
    { href: "/demo/heatmap", label: "Heatmap (e.g., Forex Correlation)" },
    { href: "/demo/map", label: "World Trends Map" },
  ];
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-accent">Data Viz Demos</h1>
      <ul className="list-disc pl-6 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link className="text-accent hover:underline" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
