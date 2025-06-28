import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ScreenType = 'home' | 'history' | 'settings';

interface NavigationState {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
}

export const useNavigationStore = create<NavigationState>()(
  immer<NavigationState>((set) => ({
    currentScreen: 'home',
    setCurrentScreen: (screen) =>
      set((state) => {
        state.currentScreen = screen;
      }),
  }))
);
