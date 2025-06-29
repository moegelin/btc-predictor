export interface PredictionHistoryItem {
  id: number;
  timestamp: number;
  prediction: 'up' | 'down';
  correct: boolean;
  priceChange: number;
}

export interface PredictionResult {
  correct: boolean;
  priceChange: number;
  resolvedAt: number;
}
