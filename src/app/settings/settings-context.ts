import { createContext, useContext } from 'react';

export type Settings = {
  // Timer in seconds to refresh the bitcoin price
  refreshTimerSeconds: number;
};

export type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

// Default settings
export const defaultSettings: Settings = {
  refreshTimerSeconds: 15, // Default is 15 seconds (15000ms)
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {}, // Default no-op function
});

export const useSettings = () => useContext(SettingsContext);
