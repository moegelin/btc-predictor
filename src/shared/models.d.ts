// User model
export interface User {
  userId: string;
  score: number;
  currentGuess: Guess | null;
  lastGuessResult: GuessResult | null;
}

// Guess model
export interface Guess {
  type: 'up' | 'down';
  timestamp: number;
  priceAtGuess: number;
}

// Guess result model
export interface GuessResult {
  correct: boolean;
  priceChange: number;
  resolvedAt: number;
}

// Bitcoin price data
export interface BitcoinPriceData {
  currentPrice: number;
  lastUpdated: number;
  previousPrice?: number;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
