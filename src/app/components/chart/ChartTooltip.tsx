import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';

export type ChartTooltipData = {
  formattedTime: string;
  price: number;
  prediction?: 'up' | 'down' | null;
  result?: boolean;
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{ payload: ChartTooltipData }>;
  label?: string;
};

/**
 * Custom tooltip component for the price history chart
 * Displays time, price, prediction, and result information
 */
export const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload /*, label*/ }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1.5,
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      }}
    >
      <Typography variant="body2" fontWeight="bold">
        {data.formattedTime}
      </Typography>
      <Typography variant="body2">
        Price: $
        {data.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Typography>
      {data.prediction && (
        <Typography
          variant="body2"
          color={data.prediction === 'up' ? 'success.main' : 'error.main'}
        >
          Prediction: {data.prediction === 'up' ? 'Up' : 'Down'}
        </Typography>
      )}
      {data.result !== undefined && (
        <Typography variant="body2" color={data.result ? 'success.main' : 'error.main'}>
          Result: {data.result ? 'Correct' : 'Incorrect'}
        </Typography>
      )}
    </Paper>
  );
};
