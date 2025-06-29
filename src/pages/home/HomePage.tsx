import { useMediaQuery, useTheme } from '@mui/material';
import { HomePageMobile } from './HomePageMobile';
import { HomePageDesktop } from './HomePageDesktop';
import type { BitcoinPriceData } from '@shared/models/types';
import type { OnGuessFn } from '@app/App';
import type { PredictionResult } from '@features/prediction';

export type HomeScreenProps = {
  price: BitcoinPriceData | null;
  onGuess: OnGuessFn;
  disabled: boolean;
  userGuess: boolean | null;
  predictionResult: PredictionResult | null;
};

export const HomePage: React.FC<HomeScreenProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? <HomePageMobile {...props} /> : <HomePageDesktop {...props} />;
};
