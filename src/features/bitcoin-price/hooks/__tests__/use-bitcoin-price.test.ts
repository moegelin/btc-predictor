import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useBitcoinPrice } from '../use-bitcoin-price';
import { ApiService } from '@server/api.service';
import { waitForNextTick } from '@test/utils/wait-for-next-tick';

vi.mock('@server/api.service', () => ({
  ApiService: {
    getBitcoinPrice: vi.fn(),
  },
}));

describe('useBitcoinPrice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    vi.mocked(ApiService.getBitcoinPrice).mockResolvedValue({
      currentPrice: 50000,
      lastUpdated: Date.now(),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should fetch bitcoin price on initial render', async () => {
    const { result } = renderHook(() => useBitcoinPrice());

    expect(result.current.price).toBeNull();

    await waitForNextTick();

    expect(ApiService.getBitcoinPrice).toHaveBeenCalledTimes(1);
    expect(result.current.price).toEqual({
      currentPrice: 50000,
      lastUpdated: expect.any(Number),
    });
  });

  it('should update progress and timeLeft as time passes', async () => {
    const { result } = renderHook(() => useBitcoinPrice({ intervalMs: 60000 }));

    expect(result.current.price).toBeNull();

    await waitForNextTick();

    expect(result.current.price).not.toBeNull();
    expect(result.current.progress).toBe(100);
    expect(result.current.timeLeft).toBe(60);

    await act(async () => {
      vi.advanceTimersByTime(30000);
    });

    expect(result.current.progress).toBe(50);
    expect(result.current.timeLeft).toBe(30);
  });

  it('should fetch new price when interval completes', async () => {
    const onRefreshMock = vi.fn();
    const { result } = renderHook(() =>
      useBitcoinPrice({
        intervalMs: 60000,
        onRefresh: onRefreshMock,
      })
    );

    await waitForNextTick();

    expect(result.current.price).not.toBeNull();
    expect(ApiService.getBitcoinPrice).toHaveBeenCalledTimes(1);

    vi.mocked(ApiService.getBitcoinPrice).mockResolvedValue({
      currentPrice: 24000,
      lastUpdated: Date.now(),
      previousPrice: 50000,
    });

    await act(async () => {
      vi.advanceTimersByTime(60000);
      await waitForNextTick();
    });

    expect(ApiService.getBitcoinPrice).toHaveBeenCalledTimes(2);

    expect(onRefreshMock).toHaveBeenCalledWith({
      currentPrice: 24000,
      lastUpdated: expect.any(Number),
      previousPrice: 50000,
    });
  });

  it('should not fetch new prices when paused', async () => {
    renderHook(() =>
      useBitcoinPrice({
        intervalMs: 60000,
        isPaused: true,
      })
    );

    await waitForNextTick();

    expect(ApiService.getBitcoinPrice).toHaveBeenCalledTimes(1);

    await act(async () => {
      vi.advanceTimersByTime(60000);
      await waitForNextTick();
    });

    expect(ApiService.getBitcoinPrice).toHaveBeenCalledTimes(1);
  });
});
