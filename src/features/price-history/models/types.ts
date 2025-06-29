export type PriceHistoryPoint = {
  timestamp: number;
  price: number;
  prediction?: 'up' | 'down' | null;
  result?: boolean;
};
