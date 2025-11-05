import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <h3 className="text-text-primary font-semibold">Portfolio Value</h3>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-accent">$124,320</div>
          <div className="text-sm text-text-secondary mt-1">+3.1% today</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-text-primary font-semibold">Open Positions</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-text-secondary text-sm">
            <li>BTC/USD — 0.35 BTC @ 68,500</li>
            <li>ETH/USD — 4.2 ETH @ 3,450</li>
            <li>NVDA — 12 @ 124.50</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-text-primary font-semibold">News</h3>
        </CardHeader>
        <CardContent>
          <div className="text-text-secondary text-sm">Market calm ahead of CPI...</div>
        </CardContent>
      </Card>
    </div>
  );
}
