import { useState, useEffect, useCallback } from 'react';
import { ApiService } from '@server/api.service';
import type { BitcoinPriceData } from '@shared/models/types';

type BitcoinPriceWithCountdownProps = {
  intervalMs?: number; // Interval in milliseconds for fetching the price
  onRefresh?: (price: BitcoinPriceData) => void; // Optional callback when the price is refreshed
  isPaused?: boolean; // Whether the refresh interval is paused
};

/**
 * Custom hook to fetch Bitcoin price with a countdown timer.
 */
export function useBitcoinPriceWithCountdown(props?: BitcoinPriceWithCountdownProps) {
  const { intervalMs = 60000, onRefresh, isPaused = false } = props || {};
  const [price, setPrice] = useState<BitcoinPriceData | null>(null);
  const [progress, setProgress] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [nextUpdate, setNextUpdate] = useState<number>(Date.now() + intervalMs);

  const fetchPrice = useCallback(async () => {
    try {
      const priceData = await ApiService.getBitcoinPrice();
      setPrice(priceData);
      const newNext = Date.now() + intervalMs;
      setNextUpdate(newNext);
      setProgress(100);
      setTimeLeft(intervalMs / 1000);
      return priceData;
    } catch (err) {
      console.error('Failed to fetch price:', err);
      throw err;
      // TODO throw error instead
    }
  }, [intervalMs]);

  useEffect(() => {
    void fetchPrice(); // initial load
  }, [fetchPrice]);

  useEffect(() => {
    // If paused, don't set up the interval
    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      const remaining = nextUpdate - Date.now();
      const secondsLeft = Math.ceil(remaining / 1000);

      if (remaining <= 0) {
        fetchPrice().then((priceData) => onRefresh?.(priceData));
        return;
      }

      setProgress(Math.max(0, (remaining / intervalMs) * 100));
      setTimeLeft((prev) => (prev !== secondsLeft ? secondsLeft : prev));
    }, 100); // smooth animation

    return () => clearInterval(interval);
  }, [nextUpdate, intervalMs, fetchPrice, onRefresh, isPaused]);

  // Manual fetch function that can be called when paused
  const manualFetch = useCallback(async () => {
    return fetchPrice().then((priceData) => {
      onRefresh?.(priceData);
      return priceData;
    });
  }, [fetchPrice, onRefresh]);

  return { price, progress, timeLeft, manualFetch };
}
