import type { BitcoinPriceData, User } from '../shared/models';

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
  getUserData: async (userId: string = '1'): Promise<User | null> => {
    // Simulate fetching user data
    return {
      userId,
      score: Math.random() * 1000, // Random score for demonstration
      currentGuess: null,
      lastGuessResult: null,
    };
  },
  // Submit a guess
  async submitGuess(type: 'up' | 'down'): Promise<User> {
    try {
      // const response = await api.post<ApiResponse<User>>('/guess', { type });
      // Simulate submitting a guess
      console.log('#### Submitting guess:', type);

      // if (!response.data.success || !response.data.data) {
      //     throw new Error(response.data.error || 'Failed to submit guess');
      // }

      // return response.data.data;
      return {
        userId: '1',
        score: 0,
        currentGuess: {
          type,
          timestamp: Date.now(),
          priceAtGuess: Math.floor(Math.random() * 100000),
        },
        lastGuessResult: null,
      };
    } catch (error) {
      console.error('Error submitting guess:', error);
      throw error;
    }
  },
};
