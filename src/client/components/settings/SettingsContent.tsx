import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import type { SelectChangeEvent } from '@mui/material';
import { useSettingsStore } from '../../stores';

interface SettingsContentProps {
  // No props needed for now, but can be extended in the future
}

export const SettingsContent: React.FC<SettingsContentProps> = () => {
  const refreshTimerSeconds = useSettingsStore((state) => state.refreshTimerSeconds);
  const setRefreshTimerSeconds = useSettingsStore((state) => state.setRefreshTimerSeconds);
  const isPriceRefreshPaused = useSettingsStore((state) => state.isPriceRefreshPaused);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const handleRefreshTimerChange = (event: SelectChangeEvent<number>) => {
    setRefreshTimerSeconds(event.target.value as number);
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}>
      <Typography
        variant={isDesktop ? 'h5' : 'h6'}
        sx={{
          textAlign: { xs: 'center', sm: 'left' },
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        Application Settings
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            fontWeight: 'medium',
            color: 'text.primary',
          }}
        >
          Bitcoin Price Updates
        </Typography>

        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="refresh-timer-label">Refresh Timer (seconds)</InputLabel>
          <Select
            labelId="refresh-timer-label"
            id="refresh-timer-select"
            value={refreshTimerSeconds}
            onChange={handleRefreshTimerChange}
            label="Refresh Timer (seconds)"
            MenuProps={{
              disableScrollLock: true,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
            }}
          >
            <MenuItem value={1}>1 seconds</MenuItem>
            <MenuItem value={5}>5 seconds</MenuItem>
            <MenuItem value={10}>10 seconds</MenuItem>
            <MenuItem value={15}>15 seconds</MenuItem>
            <MenuItem value={30}>30 seconds</MenuItem>
            <MenuItem value={60}>60 seconds</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Set how frequently the Bitcoin price should be updated. More frequent updates may use more
          resources and costs.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            fontWeight: 'medium',
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <KeyboardIcon fontSize="small" />
          Keyboard Shortcuts
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            p: 2,
            backgroundColor:
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
          }}
        >
          <List dense disablePadding>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <PauseIcon fontSize="small" color={isPriceRefreshPaused ? 'warning' : 'inherit'} />
              </ListItemIcon>
              <ListItemText
                primary="Press 'P' key"
                secondary={`${isPriceRefreshPaused ? 'Resume' : 'Pause'} Bitcoin price refresh`}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <RefreshIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Press 'M' key"
                secondary="Manually refresh Bitcoin price (when paused)"
              />
            </ListItem>
          </List>
        </Paper>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Use these keyboard shortcuts for debugging or when you want to control the price updates
          manually.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            fontWeight: 'medium',
            color: 'text.primary',
          }}
        >
          About
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Bitcoin Predictor App
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Version: 1.0.0
        </Typography>
        <Typography variant="body2" color="text.secondary">
          © Josef Mögelin
        </Typography>
      </Box>
    </Box>
  );
};
