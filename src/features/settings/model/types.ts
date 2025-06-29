export type SettingsState = {
  refreshTimerSeconds: number;
  setRefreshTimerSeconds: (seconds: number) => void;
  isPriceRefreshPaused: boolean;
  togglePriceRefreshPause: () => void;
};
