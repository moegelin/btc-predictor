import { act } from '@testing-library/react';

/**
 * Waits for the next microtask queue to flush, ensuring that any pending promises or
 * useEffect callbacks have completed.
 *
 * This is useful in tests after rendering a component or hook that triggers async
 * behavior (e.g. inside useEffect), to allow React state updates to propagate before making
 * assertions.
 */
export async function waitForNextTick(): Promise<void> {
  await act(async () => {
    await Promise.resolve();
  });
}
