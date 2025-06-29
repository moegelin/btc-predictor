import React from 'react';
import { Alert, Box, Paper, Tab, Tabs, useTheme } from '@mui/material';
import {
  type PredictionHistoryItem,
  PredictionControls,
  PredictionDisplay,
  PriceDisplay,
  ResultDisplay,
} from '../game';
import { Header } from './Header';
import { type PriceHistoryPoint } from '../chart';
import type { BitcoinPriceData } from '../../../shared/models';
import { HistoryScreen } from './screens/HistoryScreen';
import { type ScreenType, useNavigationStore } from '../../stores';
import { SettingsPage } from '@pages/SettingsPage';

type AppDesktopLayoutProps = {
  score: number;
  price: BitcoinPriceData | null;
  timeToNextUpdate: number;
  progressValue: number;
  userGuess: boolean | null;
  guessResult: { correct: boolean; priceChange: number } | null;
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
  guessResult,
  onGuess,
  loading = false,
  error,
  predictionHistory,
  priceHistory,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
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
        <Paper
          elevation={isDarkMode ? 4 : 1}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: 'background.paper',
            border: theme.customColors.cardBorder,
            overflow: 'visible',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Removed countdown indicator as it's now in the header */}

          {price && (
            <PriceDisplay
              price={price.currentPrice}
              lastUpdated={price.lastUpdated}
              previousPrice={price.previousPrice}
            />
          )}

          <PredictionControls onGuess={onGuess} disabled={loading} />

          {userGuess !== null && <PredictionDisplay guessType={userGuess ? 'up' : 'down'} />}

          {guessResult && !userGuess && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                py: 2,
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.03)',
                borderRadius: 1.5,
              }}
            >
              <ResultDisplay
                result={{
                  correct: guessResult.correct,
                  priceChange: guessResult.priceChange,
                  resolvedAt: Date.now(),
                }}
              />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Paper>
      )}

      {/* History Tab */}
      {currentScreen === 'history' && (
        <HistoryScreen priceHistory={priceHistory} predictionHistory={predictionHistory} />
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
