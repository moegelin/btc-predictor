import { createContext, useContext } from 'react';
import { createTheme } from '@mui/material/styles';

// Declare module augmentation for custom theme properties
declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      cardBackground: string;
      cardBorder: string;
      countdownBackground: string;
      countdownBorder: string;
    };
  }

  interface ThemeOptions {
    customColors?: {
      cardBackground?: string;
      cardBorder?: string;
      countdownBackground?: string;
      countdownBorder?: string;
    };
  }
}

export const themes = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#f7931a' }, // Bitcoin orange
      secondary: { main: '#4d4d4d' },
      background: {
        default: '#f9f9f9',
        paper: '#ffffff',
      },
      success: { main: '#28a745' },
      warning: { main: '#ff9800' },
      error: { main: '#dc3545' },
      text: {
        primary: '#333333',
        secondary: '#666666',
      },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
    },
    customColors: {
      cardBackground: 'transparent',
      cardBorder: 'none',
      countdownBackground: 'rgba(0, 0, 0, 0.02)',
      countdownBorder: 'none',
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#f7931a' }, // Bitcoin orange
      secondary: { main: '#90caf9' },
      background: {
        default: '#0a1929',
        paper: '#132f4c',
      },
      success: { main: '#28a745' },
      warning: { main: '#ff9800' },
      error: { main: '#dc3545' },
      text: {
        primary: '#ffffff',
        secondary: '#b0bec5',
      },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
    },
    customColors: {
      cardBackground: 'rgba(0, 0, 0, 0.2)',
      cardBorder: '1px solid rgba(255, 255, 255, 0.1)',
      countdownBackground: 'rgba(0, 0, 0, 0.2)',
      countdownBorder: '1px solid rgba(255, 255, 255, 0.05)',
    },
  }),
};

export type ThemeName = keyof typeof themes;

export const ThemeContext = createContext({
  themeName: 'light' as ThemeName,
  setThemeName: (_name: ThemeName) => {},
});

export const useThemeContext = () => useContext(ThemeContext);
