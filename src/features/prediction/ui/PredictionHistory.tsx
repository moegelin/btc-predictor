import React, { useState } from 'react';
import { Box, Typography, useTheme, Tooltip, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { PredictionHistoryItem } from '../models/types';
import { formatDate, formatPrice } from '@shared/utils';

type PredictionHistoryProps = {
  history: PredictionHistoryItem[];
};

/**
 * Displays the user's prediction history with details on each prediction.
 */
export const PredictionHistory: React.FC<PredictionHistoryProps> = ({ history }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';
  const [showAll, setShowAll] = useState(false);

  if (history.length === 0) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontStyle: 'italic', textAlign: 'center' }}
      >
        No prediction history yet
      </Typography>
    );
  }

  // Limit the number of visible items on mobile
  const visibleItems = isMobile ? (showAll ? history : history.slice(0, 5)) : history;
  const hasMore = isMobile && history.length > 5 && !showAll;

  return (
    <Box>
      {isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 0.5,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: '0.7rem',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
            }}
          >
            HISTORY
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: '0.7rem',
            }}
          >
            {visibleItems.length} of {history.length} rounds
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 0.5,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          overflowX: isMobile ? 'visible' : 'auto',
          pb: 1,
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '2px',
          },
        }}
      >
        {visibleItems.map((item) => (
          <Tooltip
            key={item.id}
            title={
              <React.Fragment>
                <Typography variant="body2">{formatDate(item.timestamp)}</Typography>
                <Typography variant="body2">
                  Prediction: {item.prediction === 'up' ? 'UP' : 'DOWN'}
                </Typography>
                <Typography variant="body2">
                  Price change: {formatPrice(item.priceChange)}
                </Typography>
                <Typography variant="body2">
                  Result: {item.correct ? 'Correct' : 'Incorrect'}
                </Typography>
              </React.Fragment>
            }
            arrow
          >
            <Box
              sx={{
                width: isMobile ? 24 : 36,
                height: isMobile ? 24 : 36,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: item.correct
                  ? isDarkMode
                    ? 'rgba(46, 125, 50, 0.2)'
                    : 'rgba(46, 125, 50, 0.1)'
                  : isDarkMode
                    ? 'rgba(211, 47, 47, 0.2)'
                    : 'rgba(211, 47, 47, 0.1)',
                border: `1px solid ${item.correct ? theme.palette.success.main : theme.palette.error.main}`,
                position: 'relative',
                flexShrink: 0,
              }}
            >
              {/* Prediction direction */}
              {item.prediction === 'up' ? (
                <ArrowUpwardIcon
                  sx={{
                    fontSize: isMobile ? '0.8rem' : '1.1rem',
                    color: theme.palette.success.main,
                    opacity: 0.7,
                  }}
                />
              ) : (
                <ArrowDownwardIcon
                  sx={{
                    fontSize: isMobile ? '0.9rem' : '1.1rem',
                    color: theme.palette.error.main,
                    opacity: 0.7,
                  }}
                />
              )}

              {/* Result indicator */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  width: isMobile ? 10 : 16,
                  height: isMobile ? 10 : 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${item.correct ? theme.palette.success.main : theme.palette.error.main}`,
                }}
              >
                {item.correct ? (
                  <CheckCircleIcon
                    sx={{
                      fontSize: isMobile ? '0.5rem' : '0.8rem',
                      color: theme.palette.success.main,
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      fontSize: isMobile ? '0.5rem' : '0.8rem',
                      color: theme.palette.error.main,
                    }}
                  />
                )}
              </Box>
            </Box>
          </Tooltip>
        ))}
      </Box>

      {/* Show more button for mobile */}
      {hasMore && (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography
            variant="caption"
            color="primary"
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.7rem',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => setShowAll(true)}
          >
            Show all {history.length} results
          </Typography>
        </Box>
      )}
    </Box>
  );
};
