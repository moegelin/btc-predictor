import React from 'react';
import { Box, Chip, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import '@app/components/game/styles/guess-status.css';

type PredictionDisplayProps = {
  guessType: 'up' | 'down';
};

/**
 * Displays the user's prediction for the next price movement.
 */
export const PredictionDisplay: React.FC<PredictionDisplayProps> = ({ guessType }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box sx={{ width: '100%' }}>
      {!isMobile ? (
        <Paper
          elevation={isDarkMode ? 4 : 0}
          sx={{
            p: 3,
            mb: 2,
            borderRadius: 2,
            backgroundColor: theme.customColors.cardBackground,
            border: theme.customColors.cardBorder,
          }}
        >
          <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
            YOUR PREDICTION
          </Typography>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Chip
              icon={guessType === 'up' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              label={guessType === 'up' ? 'PRICE WILL GO UP' : 'PRICE WILL GO DOWN'}
              color={guessType === 'up' ? 'success' : 'error'}
              variant={isDarkMode ? 'filled' : 'outlined'}
              size="medium"
              sx={{
                fontWeight: 'bold',
                py: 2.5,
                px: 1,
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          </Box>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor:
                guessType === 'up'
                  ? isDarkMode
                    ? 'rgba(46, 125, 50, 0.2)'
                    : 'rgba(46, 125, 50, 0.1)'
                  : isDarkMode
                    ? 'rgba(211, 47, 47, 0.2)'
                    : 'rgba(211, 47, 47, 0.1)',
              border: `2px solid ${guessType === 'up' ? '#2e7d32' : '#d32f2f'}`,
              boxShadow: `0 0 10px ${guessType === 'up' ? 'rgba(46, 125, 50, 0.3)' : 'rgba(211, 47, 47, 0.3)'}`,
            }}
          >
            {guessType === 'up' ? (
              <ArrowUpwardIcon
                color="success"
                fontSize="large"
                sx={{ animation: 'pulse 1.5s infinite' }}
              />
            ) : (
              <ArrowDownwardIcon
                color="error"
                fontSize="large"
                sx={{ animation: 'pulse 1.5s infinite' }}
              />
            )}
          </Box>
          <Typography
            variant="h6"
            color={guessType === 'up' ? 'success.main' : 'error.main'}
            fontWeight="bold"
            sx={{
              fontSize: '1rem',
              mb: 1,
            }}
          >
            {guessType === 'up' ? 'Price Will Go Up' : 'Price Will Go Down'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Waiting for next price update...
          </Typography>
        </Box>
      )}
    </Box>
  );
};
