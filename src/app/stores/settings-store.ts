import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type SettingsState = {
  refreshTimerSeconds: number;
  setRefreshTimerSeconds: (seconds: number) => void;
  isPriceRefreshPaused: boolean;
  togglePriceRefreshPause: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    immer<SettingsState>((set) => ({
      refreshTimerSeconds: 10, // Default value
      setRefreshTimerSeconds: (seconds) =>
        set((state) => {
          state.refreshTimerSeconds = seconds;
        }),
      isPriceRefreshPaused: false, // Default value
      togglePriceRefreshPause: () =>
        set((state) => {
          state.isPriceRefreshPaused = !state.isPriceRefreshPaused;
        }),
    })),
    {
      name: 'btc-predictor-settings', // Storage key
    }
  )
);
