import React, { useCallback, useEffect, useState } from 'react';
import { Box, CircularProgress, Container, useMediaQuery, useTheme } from '@mui/material';
import { AppMobileLayout, AppDesktopLayout } from './components/layout';
import type { PredictionHistoryItem } from './components/game';
import type { BitcoinPriceData, GuessResult } from '../shared/models';
import { useBitcoinPriceWithCountdown } from './use-bitcoin';
import type { PriceHistoryPoint } from './components/chart';
import { useSettingsStore } from '@features/settings';

export type UserGuess = 'up' | 'down' | null; // TODO replace boolean
export type OnGuessFn = (type: 'up' | 'down') => void;

export const App: React.FC = () => {
  const refreshTimerSeconds = useSettingsStore((state) => state.refreshTimerSeconds);
  const isPriceRefreshPaused = useSettingsStore((state) => state.isPriceRefreshPaused);
  const togglePriceRefreshPause = useSettingsStore((state) => state.togglePriceRefreshPause);
  const [score, setScore] = useState<number>(0);
  const [loading, _setLoading] = useState<boolean>(false);
  const [error, _setError] = useState<string | null>(null);
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [guessResult, setGuessResult] = useState<GuessResult | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<PredictionHistoryItem[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryPoint[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onBitcoinRefresh = useCallback(
    (priceData: BitcoinPriceData) => {
      // Always add the new price to the price history
      const timestamp = Date.now();
      setPriceHistory((prevHistory) => {
        // Keep only the last 20 price points
        return [
          ...prevHistory,
          {
            timestamp,
            price: priceData.currentPrice,
            prediction:
              userGuess !== null ? (userGuess ? ('up' as const) : ('down' as const)) : undefined,
          },
        ].slice(-20);
      });

      // If there's no user guess, nothing to check
      if (userGuess === null || !priceData.previousPrice) {
        return;
      }

      const priceDown = priceData?.previousPrice > priceData.currentPrice;
      const priceUp = priceData?.previousPrice < priceData?.currentPrice;
      const correctGuess = (userGuess && priceUp) || (!userGuess && priceDown);

      setScore((prevScore: number) => prevScore + (correctGuess ? 1 : -1));
      const priceChangeValue = priceData.currentPrice - priceData.previousPrice;

      setGuessResult({
        correct: correctGuess,
        priceChange: priceChangeValue,
        resolvedAt: Date.now(),
      });

      // Add to game history (add new items at the beginning so newest are on the right)
      const newPredictionHistory = {
        id: timestamp,
        timestamp,
        prediction: userGuess ? 'up' : ('down' as 'up' | 'down'),
        correct: correctGuess,
        priceChange: priceChangeValue,
      };

      setPredictionHistory((prevHistory) => [newPredictionHistory, ...prevHistory].slice(0, 10)); // Keep only the last 10 items

      // Update the price history with the result
      setPriceHistory((prevHistory) => {
        const lastIndex = prevHistory.length - 1;
        if (lastIndex >= 0) {
          const updatedHistory = [...prevHistory];
          updatedHistory[lastIndex] = {
            ...updatedHistory[lastIndex],
            result: correctGuess,
          };
          return updatedHistory;
        }
        return prevHistory;
      });

      // Reset the user guess
      setUserGuess(null);
    },
    [userGuess]
  );

  const {
    price,
    progress: progressValue,
    timeLeft: timeToNextUpdate,
    manualFetch,
  } = useBitcoinPriceWithCountdown({
    intervalMs: refreshTimerSeconds * 1000,
    onRefresh: onBitcoinRefresh,
    isPaused: isPriceRefreshPaused,
  });

  // Add key event listener for toggling price refresh pause
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle pause on 'p' key press
      if (event.key === 'p') {
        togglePriceRefreshPause();
        console.log(`Bitcoin price refresh ${isPriceRefreshPaused ? 'resumed' : 'paused'}`);
      }
      // Manual fetch on 'm' key press when paused
      else if (event.key === 'm' && isPriceRefreshPaused) {
        void manualFetch();
        console.log('Manual Bitcoin price fetch triggered');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePriceRefreshPause, isPriceRefreshPaused, manualFetch]);

  const handleGuess: OnGuessFn = useCallback(async (type) => {
    setUserGuess(type === 'up');

    // Reset guess result when making a new guess
    setGuessResult(null);
  }, []);

  // Show loading spinner while initial data is being fetched
  if (loading && !price) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress color="primary" size={60} thickness={4} />
        </Box>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          pt: isMobile ? 1 : 4,
          px: isMobile ? 1 : 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isMobile ? (
          <Box sx={{ mb: 6 }}>
            <AppMobileLayout
              score={score}
              price={price}
              timeToNextUpdate={timeToNextUpdate}
              progressValue={progressValue}
              userGuess={userGuess}
              guessResult={guessResult}
              onGuess={handleGuess}
              loading={loading}
              error={error}
              predictionHistory={predictionHistory}
              priceHistory={priceHistory}
            />
          </Box>
        ) : (
          <AppDesktopLayout
            score={score}
            price={price}
            timeToNextUpdate={timeToNextUpdate}
            progressValue={progressValue}
            userGuess={userGuess}
            guessResult={guessResult}
            onGuess={handleGuess}
            loading={loading}
            error={error}
            predictionHistory={predictionHistory}
            priceHistory={priceHistory}
          />
        )}
      </Container>
    </Box>
  );
};
