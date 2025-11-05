export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  totalValue: number;
  currency: string;
}

export interface Trade {
  id: string;
  portfolioId: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
}
