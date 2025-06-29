import type { BitcoinPriceData } from '@shared/models';

// Store the previous price value
let previousBitcoinPrice: number | undefined = undefined;

export const ApiService = {
  getBitcoinPrice: async (): Promise<BitcoinPriceData> => {
    // Generate a new random price
    const currentPrice = Math.floor(Math.random() * 100000);

    // Create the response object
    const priceData: BitcoinPriceData = {
      currentPrice,
      lastUpdated: Date.now(),
    };

    // Add the previous price if available
    if (previousBitcoinPrice !== undefined) {
      priceData.previousPrice = previousBitcoinPrice;
    }

    // Update the previous price for the next call
    previousBitcoinPrice = currentPrice;

    return priceData;
  },
};
