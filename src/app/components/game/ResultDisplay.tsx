import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import type { GuessResult } from '../../../shared/models';

type ResultDisplayProps = {
  result: GuessResult;
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const { correct, priceChange } = result;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Format price change with sign and 2 decimal places
  const formattedPriceChange = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    signDisplay: 'always',
  }).format(priceChange);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      {correct ? (
        <CheckCircleOutlineIcon
          color="success"
          sx={{
            fontSize: isMobile ? '2.5rem' : '3rem',
          }}
        />
      ) : (
        <ErrorOutlineIcon
          color="error"
          sx={{
            fontSize: isMobile ? '2.5rem' : '3rem',
          }}
        />
      )}

      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        fontWeight="bold"
        color={correct ? 'success.main' : 'error.main'}
        sx={{ fontSize: isMobile ? '1rem' : undefined }}
      >
        {correct ? 'Correct Prediction!' : 'Incorrect Prediction'}
      </Typography>

      <Typography variant={isMobile ? 'body2' : 'body1'} sx={{ mb: isMobile ? 0.5 : 1 }}>
        The price changed by <strong>{formattedPriceChange}</strong>
      </Typography>

      <Typography
        variant={isMobile ? 'body2' : 'body1'}
        fontWeight="bold"
        color={correct ? 'success.main' : 'error.main'}
      >
        {correct ? 'You earned 1 point!' : 'You lost 1 point.'}
      </Typography>
    </Box>
  );
};
