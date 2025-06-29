import type { BitcoinPriceData, GuessResult } from '@shared/models';
import { Box, Typography, useTheme } from '@mui/material';
import {
  PriceDisplay,
  PredictionControls,
  PredictionDisplay,
  ResultDisplay,
} from '@app/components/game';
import type { OnGuessFn } from '@app/App';
import { WidgetContainer } from '@app/components/common';

type HomeScreenProps = {
  price: BitcoinPriceData | null;
  onGuess: OnGuessFn;
  disabled: boolean;
  userGuess: boolean | null;
  guessResult: GuessResult | null;
};

export const HomePageMobile: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
  const { price, onGuess, disabled, userGuess, guessResult } = props;
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {price && (
        <WidgetContainer sx={{ backgroundColor: 'background.paper' }}>
          {/* Price Display */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
            }}
          >
            <PriceDisplay
              price={price.currentPrice}
              lastUpdated={price.lastUpdated}
              previousPrice={price.previousPrice}
            />
          </Box>

          {/* Prediction Controls */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 'auto',
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: '0.7rem', mb: 0.5 }}
            >
              PREDICT NEXT PRICE
            </Typography>
            <PredictionControls onGuess={onGuess} disabled={disabled} compact={true} />
          </Box>
        </WidgetContainer>
      )}

      {/* Combined Prediction and Result Box */}
      <Box>
        <WidgetContainer sx={{ backgroundColor: 'background.paper' }}>
          <Typography
            variant="subtitle2"
            color="text.primary"
            sx={{
              fontSize: '0.85rem',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              textAlign: 'center',
              mb: 1,
            }}
          >
            {userGuess !== null ? 'YOUR PREDICTION' : 'GAME STATUS'}
          </Typography>

          {/* Content Area */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              py: 1,
              minHeight: '150px', // Fixed height to prevent jumping
              backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.03)',
              borderRadius: 1.5,
            }}
          >
            {/* Prediction Status */}
            {userGuess !== null ? (
              <PredictionDisplay guessType={userGuess ? 'up' : 'down'} />
            ) : guessResult ? (
              <ResultDisplay
                result={{
                  correct: guessResult.correct,
                  priceChange: guessResult.priceChange,
                  resolvedAt: guessResult.resolvedAt,
                }}
              />
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  borderRadius: 1,
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Make a prediction for the next round
                </Typography>
              </Box>
            )}
          </Box>
        </WidgetContainer>
      </Box>
    </Box>
  );
};
