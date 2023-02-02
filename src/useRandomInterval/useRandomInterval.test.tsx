import { act, renderHook } from '@testing-library/react';
import { useRandomInterval } from './useRandomInterval';
import '../../tests/toBeWithinRange';

jest.useFakeTimers();

const callback = jest.fn();

const minDelay = 100;
const maxDelay = 200;

describe('useRandomInterval', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initialize', () => {
    const { result } = renderHook(() => useRandomInterval(callback, minDelay, maxDelay));

    const { start, stop, toggle, active } = result.current;

    expect(typeof active).toBe('boolean');
    expect(typeof start).toBe('function');
    expect(typeof stop).toBe('function');
    expect(typeof toggle).toBe('function');
  });

  it('calls the callback at random intervals', () => {
    const { result } = renderHook(() => useRandomInterval(callback, minDelay, maxDelay));

    const maxTime = maxDelay * 2;
    const range = { min: maxTime / maxDelay, max: maxTime / minDelay };

    act(() => {
      result.current.start();
      jest.advanceTimersByTime(maxDelay * 2);
    });

    expect(result.current.active).toBe(true);
    expect(callback.mock.calls.length).toBeWithinRange(range.min, range.max);
  });

  it('stops the interval when the stop function is called', () => {
    const { result } = renderHook(() => useRandomInterval(callback, minDelay, maxDelay));

    const maxTime = maxDelay * 2;
    const range = { min: maxTime / maxDelay, max: maxTime / minDelay };

    act(() => {
      result.current.start();
      jest.advanceTimersByTime(maxDelay * 2);
    });

    expect(result.current.active).toBe(true);
    expect(callback.mock.calls.length).toBeWithinRange(range.min, range.max);

    act(() => {
      result.current.stop();
      jest.advanceTimersByTime(maxDelay * 2);
    });

    expect(result.current.active).toBe(false);
    expect(callback.mock.calls.length).toBeWithinRange(range.min, range.max);
  });

  it('starts the interval when the toggle function is called', () => {
    const { result } = renderHook(() => useRandomInterval(callback, minDelay, maxDelay));

    const maxTime = maxDelay * 4;
    const range = { min: maxTime / maxDelay, max: maxTime / minDelay };

    act(() => {
      result.current.start();
      jest.advanceTimersByTime(maxDelay * 2);
    });

    expect(result.current.active).toBe(true);

    act(() => {
      result.current.stop();
    });

    expect(result.current.active).toBe(false);

    act(() => {
      result.current.toggle();
      jest.advanceTimersByTime(maxDelay * 2);
    });

    expect(result.current.active).toBe(true);
    expect(callback.mock.calls.length).toBeWithinRange(range.min, range.max);
  });
});
