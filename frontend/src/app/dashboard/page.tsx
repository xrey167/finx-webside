import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">Welcome to your FinX trading platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="glass">
          <div className="text-center">
            <p className="text-text-muted text-sm">Total Portfolio Value</p>
            <p className="text-2xl font-bold text-success">$25,674.89</p>
            <p className="text-sm text-success">+2.34% (24h)</p>
          </div>
        </Card>

        <Card variant="glass">
          <div className="text-center">
            <p className="text-text-muted text-sm">Active Positions</p>
            <p className="text-2xl font-bold text-text-primary">12</p>
            <p className="text-sm text-text-muted">3 new today</p>
          </div>
        </Card>

        <Card variant="glass">
          <div className="text-center">
            <p className="text-text-muted text-sm">24h P&L</p>
            <p className="text-2xl font-bold text-success">+$542.15</p>
            <p className="text-sm text-success">+2.15%</p>
          </div>
        </Card>

        <Card variant="glass">
          <div className="text-center">
            <p className="text-text-muted text-sm">Win Rate</p>
            <p className="text-2xl font-bold text-accent">73.2%</p>
            <p className="text-sm text-text-muted">Last 30 days</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Trades</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-surface-hover rounded-md">
                <div>
                  <p className="font-medium text-text-primary">AAPL</p>
                  <p className="text-sm text-text-muted">Apple Inc.</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-success">+$234.50</p>
                  <p className="text-sm text-text-muted">10 shares</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="glass">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Market Overview</h3>
          <div className="space-y-3">
            {[
              { symbol: "SPY", name: "S&P 500 ETF", price: "$452.10", change: "+1.2%" },
              { symbol: "QQQ", name: "Nasdaq ETF", price: "$378.45", change: "+2.1%" },
              { symbol: "BTC", name: "Bitcoin", price: "$43,250", change: "-0.8%" },
            ].map((stock) => (
              <div key={stock.symbol} className="flex justify-between items-center p-3 bg-surface-hover rounded-md">
                <div>
                  <p className="font-medium text-text-primary">{stock.symbol}</p>
                  <p className="text-sm text-text-muted">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-text-primary">{stock.price}</p>
                  <p className={`text-sm ${stock.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                    {stock.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
