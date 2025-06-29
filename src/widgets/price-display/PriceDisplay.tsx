import React from 'react';
import { Typography, Box, useTheme, Chip, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PauseIcon from '@mui/icons-material/Pause';
import NumberFlow, { type Format } from '@number-flow/react';
import { useSettingsStore } from '@features/settings';
import { WidgetContainer } from '@shared/ui/WidgetContainer';
import './price-display.css';

const PriceChange = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPositive',
})<{ isPositive: boolean }>(({ theme, isPositive }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: isPositive ? theme.palette.success.main : theme.palette.error.main,
  fontWeight: 'bold',
  marginRight: theme.spacing(2),
}));

type PriceDisplayProps = {
  price: number;
  lastUpdated: number;
  previousPrice?: number;
};

const priceFormat: Format = {
  style: 'currency',
  currency: 'USD',
};
const locale = 'en-US';

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  lastUpdated,
  previousPrice,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isPriceRefreshPaused = useSettingsStore((state) => state.isPriceRefreshPaused);

  // Format last updated time
  const formattedTime = new Date(lastUpdated).toLocaleTimeString();

  // Calculate price change if previous price is available
  const priceChange = previousPrice !== undefined ? price - previousPrice : 0;
  const isPositive = priceChange >= 0;

  return (
    <WidgetContainer sx={{ textAlign: 'center', width: '100%' }}>
      {!isMobile && (
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          LIVE PRICE
        </Typography>
      )}
      <Box marginBottom={isMobile ? 0 : 1}>
        <NumberFlow
          value={price}
          trend={0}
          locales={locale}
          className={isMobile ? '' : 'is-desktop-size'}
          format={priceFormat}
          willChange
          style={isMobile ? { fontSize: '1.8rem', fontWeight: 600 } : undefined}
        />
      </Box>
      {previousPrice !== undefined && (
        <>
          <PriceChange isPositive={isPositive}>
            {isPositive ? (
              <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} />
            ) : (
              <ArrowDownwardIcon fontSize="small" sx={{ mr: 0.5 }} />
            )}
            <NumberFlow
              value={priceChange}
              trend={0}
              locales={locale}
              format={priceFormat}
              willChange
            />
          </PriceChange>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <NumberFlow
              prefix={'Previous: '}
              value={previousPrice}
              trend={0}
              locales={locale}
              format={priceFormat}
              willChange
            />
          </Typography>
        </>
      )}
      {!isMobile && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, gap: 1 }}
        >
          <Typography variant="body2" color="text.secondary">
            Last updated: {formattedTime}
          </Typography>
          {isPriceRefreshPaused && (
            <Chip
              icon={<PauseIcon fontSize="small" />}
              label="Paused"
              size="small"
              color="warning"
              sx={{ height: 20, '& .MuiChip-label': { px: 1 } }}
            />
          )}
        </Box>
      )}
    </WidgetContainer>
  );
};
