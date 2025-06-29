import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import btcLogo from '../../../assets/btc-logo.svg';
import { useThemeContext } from '../../theme/theme-context';
import NumberFlow from '@number-flow/react';

// Styled components
const LogoImg = styled('img', {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile?: boolean }>(({ isMobile }) => ({
  width: isMobile ? 35 : 50,
  height: isMobile ? 35 : 50,
  marginRight: isMobile ? 8 : 16,
}));

type HeaderProps = {
  score: number;
  timeToNextUpdate?: number;
  progressValue?: number;
};

export const Header: React.FC<HeaderProps> = ({ score, timeToNextUpdate, progressValue }) => {
  const theme = useTheme();
  const { themeName, setThemeName } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        mb: isMobile ? 1 : 2,
        borderBottom: 'none',
        position: 'relative',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: isMobile ? 56 : 64,
          px: isMobile ? 1 : 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoImg src={btcLogo} alt="Bitcoin Logo" isMobile={isMobile} />
          <Typography
            variant={isMobile ? 'h6' : 'h4'}
            component="h1"
            color="primary"
            fontWeight="bold"
            sx={{ fontSize: isMobile ? '1.1rem' : undefined }}
          >
            {isMobile ? 'BTC Predictor' : 'Bitcoin Price Guesser'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {timeToNextUpdate !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <Typography
                variant="body2"
                fontWeight="bold"
                color={
                  timeToNextUpdate <= 15
                    ? 'error.main'
                    : timeToNextUpdate <= 35
                      ? 'warning.main'
                      : 'success.main'
                }
                sx={{ fontSize: isMobile ? '0.75rem' : '0.85rem' }}
              >
                {timeToNextUpdate}s
              </Typography>
            </Box>
          )}

          <IconButton
            onClick={() => setThemeName(themeName === 'dark' ? 'light' : 'dark')}
            color="inherit"
            aria-label="toggle theme"
            size={isMobile ? 'small' : 'medium'}
          >
            {themeName === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <NumberFlow trend={0} value={score} prefix={'Score: '} />
        </Box>
      </Toolbar>

      {/* Countdown Progress Bar */}
      {timeToNextUpdate !== undefined && progressValue !== undefined && (
        <LinearProgress
          variant="determinate"
          value={progressValue}
          color={timeToNextUpdate <= 15 ? 'error' : timeToNextUpdate <= 35 ? 'warning' : 'success'}
          sx={{
            height: 3,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            borderRadius: 0,
            opacity: timeToNextUpdate <= 35 ? 1 : 0.7,
            '& .MuiLinearProgress-bar': {
              transition: 'transform 0.1s linear',
            },
          }}
        />
      )}
    </AppBar>
  );
};
