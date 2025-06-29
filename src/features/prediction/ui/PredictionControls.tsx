import React from 'react';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { styled } from '@mui/material/styles';
import { WidgetContainer } from '@shared/ui/WidgetContainer';

const ControlsContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'compact',
})<{ compact?: boolean }>(({ theme, compact }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: compact ? theme.spacing(1) : theme.spacing(4),
  marginBottom: compact ? 0 : theme.spacing(2),
  flexDirection: compact ? 'column' : undefined,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: compact ? theme.spacing(1) : theme.spacing(2),
    marginBottom: theme.spacing(0),
  },
}));

const PredictionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'compact',
})<{ compact?: boolean }>(({ compact }) => ({
  padding: compact ? '6px 12px' : '12px 24px',
  fontWeight: 'bold',
  fontSize: compact ? '0.8rem' : '1.1rem',
  minWidth: compact ? '120px' : '160px',
  width: compact ? '100%' : 'auto',
  transition: 'all 0.3s ease',
  '&:hover:not(:disabled)': {
    transform: 'translateY(-3px)',
  },
}));

type PredictionControlsProps = {
  onGuess: (type: 'up' | 'down') => void;
  disabled: boolean;
};

/**
 * Up and Down buttons for making price predictions.
 */
export const PredictionControls: React.FC<PredictionControlsProps> = ({ onGuess, disabled }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box sx={{ width: '100%' }}>
      {!isMobile && (
        <WidgetContainer>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 2 }}>
            PREDICT NEXT PRICE
          </Typography>

          <ControlsContainer>
            <PredictionButton
              variant={isDarkMode ? 'contained' : 'contained'}
              color="success"
              size="large"
              onClick={() => onGuess('up')}
              disabled={disabled}
              aria-label="Guess price will go up"
              startIcon={<ArrowUpwardIcon />}
              sx={{
                background: isDarkMode ? 'linear-gradient(to bottom, #28a745, #218838)' : undefined,
              }}
            >
              <Typography variant="button" fontWeight="bold">
                UP
              </Typography>
            </PredictionButton>

            <PredictionButton
              variant={isDarkMode ? 'contained' : 'contained'}
              color="error"
              size="large"
              onClick={() => onGuess('down')}
              disabled={disabled}
              aria-label="Guess price will go down"
              startIcon={<ArrowDownwardIcon />}
              sx={{
                background: isDarkMode ? 'linear-gradient(to bottom, #dc3545, #c82333)' : undefined,
              }}
            >
              <Typography variant="button" fontWeight="bold">
                DOWN
              </Typography>
            </PredictionButton>
          </ControlsContainer>
        </WidgetContainer>
      )}

      {isMobile && (
        <ControlsContainer compact={isMobile}>
          <PredictionButton
            variant={isDarkMode ? 'contained' : 'contained'}
            color="success"
            size="small"
            onClick={() => onGuess('up')}
            disabled={disabled}
            aria-label="Guess price will go up"
            startIcon={<ArrowUpwardIcon fontSize="small" />}
            compact={isMobile}
            sx={{
              background: isDarkMode ? 'linear-gradient(to bottom, #28a745, #218838)' : undefined,
              borderRadius: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              },
            }}
          >
            <Typography variant="button" fontWeight="bold" fontSize="0.75rem">
              UP
            </Typography>
          </PredictionButton>

          <PredictionButton
            variant={isDarkMode ? 'contained' : 'contained'}
            color="error"
            size="small"
            onClick={() => onGuess('down')}
            disabled={disabled}
            aria-label="Guess price will go down"
            startIcon={<ArrowDownwardIcon fontSize="small" />}
            compact={isMobile}
            sx={{
              background: isDarkMode ? 'linear-gradient(to bottom, #dc3545, #c82333)' : undefined,
              borderRadius: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              },
            }}
          >
            <Typography variant="button" fontWeight="bold" fontSize="0.75rem">
              DOWN
            </Typography>
          </PredictionButton>
        </ControlsContainer>
      )}
    </Box>
  );
};
