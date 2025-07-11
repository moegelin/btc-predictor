import React, { useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext, themes } from './theme-context';
import type { ThemeName } from './theme-context';

// Enhanced theme provider that supports multiple named themes
export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('dark');
  const currentTheme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
