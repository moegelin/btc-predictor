import React from 'react';
import { Alert, BottomNavigation, BottomNavigationAction, Paper, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import { Header } from './Header';
import type { PredictionHistoryItem } from '../game';
import type { PriceHistoryPoint } from '@features/price-history';
import type { BitcoinPriceData, GuessResult } from '../../../shared/models';
import type { OnGuessFn } from '../../App';
import { useNavigationStore, type ScreenType } from '../../stores';
import { HomeScreen } from './screens/HomeScreen';
import { HistoryPage } from '@pages/HistoryPage';
import { SettingsPage } from '@pages/SettingsPage';

type AppMobileLayoutProps = {
  score: number;
  price: BitcoinPriceData | null;
  timeToNextUpdate: number;
  progressValue: number;
  userGuess: boolean | null;
  guessResult: GuessResult | null;
  onGuess: OnGuessFn;
  loading?: boolean;
  error: string | null;
  predictionHistory: PredictionHistoryItem[];
  priceHistory: PriceHistoryPoint[];
};
const navScreenMap: ScreenType[] = ['home', 'history', 'settings'];

export const AppMobileLayout: React.FC<AppMobileLayoutProps> = ({
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

  return (
    <>
      <Header score={score} timeToNextUpdate={timeToNextUpdate} progressValue={progressValue} />

      {currentScreen === 'home' && (
        <HomeScreen
          price={price}
          onGuess={onGuess}
          disabled={loading}
          userGuess={userGuess}
          guessResult={guessResult}
        />
      )}

      {currentScreen === 'history' && (
        <HistoryPage priceHistory={priceHistory} predictionHistory={predictionHistory} />
      )}

      {currentScreen === 'settings' && <SettingsPage />}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Bottom Navigation */}
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}
        elevation={3}
      >
        <BottomNavigation
          value={navScreenMap.indexOf(currentScreen)}
          onChange={(_event, newValue) => {
            setCurrentScreen(navScreenMap[newValue]);
          }}
          showLabels
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="History" icon={<HistoryIcon />} />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
};
