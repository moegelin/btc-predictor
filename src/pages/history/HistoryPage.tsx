import React from 'react';
import { Typography } from '@mui/material';
import { PriceHistoryChart, type PriceHistoryPoint } from '@features/price-history';
import { PredictionHistory, type PredictionHistoryItem } from '@features/prediction';
import { WidgetContainer } from '@shared/ui/WidgetContainer';

type HistoryScreenProps = {
  priceHistory: PriceHistoryPoint[];
  predictionHistory: PredictionHistoryItem[];
};

export const HistoryPage: React.FC<HistoryScreenProps> = ({ priceHistory, predictionHistory }) => {
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
