import React from 'react';
import { Alert, Box, Tab, Tabs } from '@mui/material';
import { Header } from '@widgets/header';
import { type PriceHistoryPoint } from '@features/price-history';
import type { BitcoinPriceData } from '@shared/models/types';
import { HistoryPage } from '@pages/history/HistoryPage';
import { type ScreenType, useNavigationStore } from '../stores';
import { SettingsPage } from '@pages/settings/SettingsPage';
import { HomePage } from '@pages/home/HomePage';
import type { PredictionHistoryItem, PredictionResult } from '@features/prediction';

type AppDesktopLayoutProps = {
  score: number;
  price: BitcoinPriceData | null;
  timeToNextUpdate: number;
  progressValue: number;
  userGuess: boolean | null;
  predictionResult: PredictionResult | null;
  onGuess: (type: 'up' | 'down') => void;
  loading?: boolean;
  error: string | null;
  predictionHistory: PredictionHistoryItem[];
  priceHistory: PriceHistoryPoint[];
};
const tabScreenMap: ScreenType[] = ['home', 'history', 'settings'];

export const AppDesktopLayout: React.FC<AppDesktopLayoutProps> = ({
  score,
  price,
  timeToNextUpdate,
  progressValue,
  userGuess,
  predictionResult,
  onGuess,
  loading = false,
  error,
  predictionHistory,
  priceHistory,
}) => {
  const currentScreen = useNavigationStore((state) => state.currentScreen);
  const setCurrentScreen = useNavigationStore((state) => state.setCurrentScreen);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentScreen(tabScreenMap[newValue]);
  };

  return (
    <>
      <Header score={score} timeToNextUpdate={timeToNextUpdate} progressValue={progressValue} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={tabScreenMap.indexOf(currentScreen)}
          onChange={handleTabChange}
          aria-label="desktop navigation tabs"
          centered
        >
          <Tab label="Home" />
          <Tab label="History" />
          <Tab label="Settings" />
        </Tabs>
      </Box>

      {/* Home Tab */}
      {currentScreen === 'home' && (
        <HomePage
          price={price}
          onGuess={onGuess}
          disabled={loading}
          userGuess={userGuess}
          predictionResult={predictionResult}
        />
      )}

      {/* History Tab */}
      {currentScreen === 'history' && (
        <HistoryPage priceHistory={priceHistory} predictionHistory={predictionHistory} />
      )}

      {/* Settings Tab */}
      {currentScreen === 'settings' && <SettingsPage />}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </>
  );
};
