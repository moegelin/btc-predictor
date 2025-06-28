import React from 'react';
import { Typography } from '@mui/material';
import { PredictionHistory, type PredictionHistoryItem } from '../../game';
import { PriceHistoryChart, type PriceHistoryPoint } from '../../chart';
import { WidgetContainer } from '../../common';

type HistoryScreenProps = {
  priceHistory: PriceHistoryPoint[];
  predictionHistory: PredictionHistoryItem[];
};

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  priceHistory,
  predictionHistory,
}) => {
  return (
    <>
      <WidgetContainer sx={{ backgroundColor: 'background.paper' }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Price History
        </Typography>

        <PriceHistoryChart data={priceHistory} />
      </WidgetContainer>

      <WidgetContainer sx={{ backgroundColor: 'background.paper' }}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 1,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Prediction History
        </Typography>

        <PredictionHistory history={predictionHistory} />
      </WidgetContainer>
    </>
  );
};
