import { useMediaQuery, useTheme } from '@mui/material';
import { HomePageMobile } from './HomePageMobile';
import { HomePageDesktop } from './HomePageDesktop';
import type { BitcoinPriceData, GuessResult } from '@shared/models';
import type { OnGuessFn } from '@app/App';

export type HomeScreenProps = {
  price: BitcoinPriceData | null;
  onGuess: OnGuessFn;
  disabled: boolean;
  userGuess: boolean | null;
  guessResult: GuessResult | null;
};

export const HomePage: React.FC<HomeScreenProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? <HomePageMobile {...props} /> : <HomePageDesktop {...props} />;
};
