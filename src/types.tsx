export interface User {
  username: string;
  email: string;
  password: string;
  fullname: string;
  mobileno: string;
  selected_stocks: SelectedStock[];
  wishlisted_stocks: WishlistedStock[];
  _v: number;
  _id: string;
}

export interface SelectedStock {
  _id: string;
  price: number;
  quantity: number;
}

export interface WishlistedStock {
  _id: string;
}

export interface Stock {
  _id: string;
  name: string;
  symbol: string;
  price: number;
  sector: string;
  market_cap: number;
  volume: number;
  price_to_earnings_ratio: number;
  return_on_equity: number;
  net_profit_margin: number;
  total_debt: number;
  free_cash_flow: number;
  price_to_book_ratio: number;
  price_to_sales_ratio: number;
  debt_to_equity_ratio: number;
  historical_prices?: HistoricalPrice[];
  predictions?: number[];
}

export interface HistoricalPrice {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

