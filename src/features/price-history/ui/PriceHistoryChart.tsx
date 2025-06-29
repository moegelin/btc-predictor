import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ChartTooltip } from './ChartTooltip';
import { CustomDot } from './CustomDot';
import type { PriceHistoryPoint } from '../models/types';

type PriceHistoryChartProps = {
  data: PriceHistoryPoint[];
};

/**
 * PriceHistoryChart component displays a line chart of Bitcoin price history
 */
export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = React.memo(({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';

  // TODO add small toggle for reference lines

  // Memoize the chart data to prevent unnecessary recalculations
  const chartData = useMemo(() => {
    return data.map((point) => ({
      timestamp: point.timestamp,
      price: point.price,
      prediction: point.prediction,
      result: point.result,
      formattedTime: new Date(point.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }));
  }, [data]);

  const visibleChartData = useMemo(() => {
    if (isMobile) {
      return chartData.slice(-10);
    }
    return chartData;
  }, [chartData, isMobile]);

  // Memoize the Y-axis domain calculation
  const yDomain = useMemo(() => {
    const prices = data.map((point) => point.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceDiff = maxPrice - minPrice;
    return [
      minPrice - priceDiff * 0.05, // Add 5% padding to the bottom
      maxPrice + priceDiff * 0.05, // Add 5% padding to the top
    ];
  }, [data]);

  if (data.length === 0) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontStyle: 'italic', textAlign: 'center' }}
      >
        No price history data available yet
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%', height: isMobile ? 300 : 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={visibleChartData} margin={{ right: 20 }}>
          <CartesianGrid
            strokeDasharray="5 5"
            stroke={isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
          />
          <XAxis
            dataKey="formattedTime"
            tick={{ fill: theme.palette.text.secondary, fontSize: isMobile ? 10 : 12 }}
            tickLine={{ stroke: theme.palette.divider }}
            axisLine={{ stroke: theme.palette.divider }}
          />
          <YAxis
            domain={yDomain}
            tick={{ fill: theme.palette.text.secondary, fontSize: isMobile ? 10 : 12 }}
            tickLine={{ stroke: theme.palette.divider }}
            axisLine={{ stroke: theme.palette.divider }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            dot={(props) => {
              const { key, ...rest } = props;
              return <CustomDot key={key} {...rest} />;
            }}
            activeDot={(props) => {
              const { key, ...rest } = props;
              return <CustomDot key={key} {...rest} isActive />;
            }}
          />
          {/* Add reference lines for predictions */}
          {chartData
            .filter((point) => point.prediction)
            .map((point, index) => (
              <ReferenceLine
                key={`prediction-${index}`}
                x={point.formattedTime}
                stroke={point.result ? theme.palette.success.main : theme.palette.error.main}
                strokeDasharray="3 3"
                strokeWidth={2}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
});
