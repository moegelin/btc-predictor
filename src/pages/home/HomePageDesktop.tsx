import { Box, Paper, useTheme } from '@mui/material';
import {
  PredictionControls,
  PredictionDisplay,
  PriceDisplay,
  ResultDisplay,
} from '@app/components/game';
import type { HomeScreenProps } from './HomePage';

export const HomePageDesktop: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
  const { price, onGuess, disabled, userGuess, guessResult } = props;
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
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

      <PredictionControls onGuess={onGuess} disabled={disabled} />

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
    </Paper>
  );
};
