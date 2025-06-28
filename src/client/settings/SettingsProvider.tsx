import React, { useState, useCallback, useMemo } from 'react';
import { SettingsContext, defaultSettings, type Settings } from './settings-context.ts';

const SETTINGS_STORAGE_KEY = 'btc-predictor-settings';

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  // Initialize settings from localStorage if available, otherwise use defaults
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error);
      return defaultSettings;
    }
  });

  // Update settings and save to localStorage
  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, ...newSettings };

      // Save to localStorage
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
      } catch (error) {
        console.error('Failed to save settings to localStorage:', error);
      }

      return updatedSettings;
    });
  }, []);

  // Create memoized context value
  const contextValue = useMemo(
    () => ({
      settings,
      updateSettings,
    }),
    [settings, updateSettings]
  );

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};
