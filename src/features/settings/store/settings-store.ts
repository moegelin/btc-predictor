import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { SettingsState } from '../model/types';
import { DEFAULT_REFRESH_TIMER } from '../model/defaults';

const storageKey = 'btc-predictor-settings';

export const useSettingsStore = create<SettingsState>()(
  persist(
    immer<SettingsState>((set) => ({
      refreshTimerSeconds: DEFAULT_REFRESH_TIMER,
      setRefreshTimerSeconds: (seconds) =>
        set((state) => {
          state.refreshTimerSeconds = seconds;
        }),
      isPriceRefreshPaused: false,
      togglePriceRefreshPause: () =>
        set((state) => {
          state.isPriceRefreshPaused = !state.isPriceRefreshPaused;
        }),
    })),
    {
      name: storageKey,
    }
  )
);
