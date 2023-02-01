import { renderHook } from '@testing-library/react';
import { useTimeout } from '../src/useTimeout';

const defaultTimeout = 2000;

const callback = jest.fn();

const setupTimer = (timeout: number) => ({
  timeout,
  advanceTimerToNextTick: () => jest.advanceTimersByTime(timeout),
});

describe('useTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'clearTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('callback should fire without', () => {
    const { timeout, advanceTimerToNextTick } = setupTimer(defaultTimeout);
    renderHook(() => useTimeout(callback, timeout));

    advanceTimerToNextTick();

    expect(callback).toBeCalled();
    expect(setTimeout).toHaveBeenCalled();
  });
});
