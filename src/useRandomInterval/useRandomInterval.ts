import { useCallback, useEffect, useRef, useState } from 'react';
import { random } from '../utils';

interface UseRandomIntervalReturnType {
  start: () => void;
  stop: () => void;
  toggle: () => void;
  active: boolean;
}

export const useRandomInterval = (
  callback: () => void,
  minDelay: number,
  maxDelay: number,
): UseRandomIntervalReturnType => {
  const timeoutId = useRef<number | null>(null);
  const savedCallback = useRef<() => void>(callback);
  const [active, setIsActive] = useState(false);

  useEffect(() => {
    savedCallback.current = callback;
  });

  const start = useCallback(() => {
    const isEnabled = typeof minDelay === 'number' && typeof maxDelay === 'number';

    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
      setIsActive(true);
    }
  }, [minDelay, maxDelay]);

  useEffect(() => {
    return () => window.clearTimeout(timeoutId.current!);
  }, [minDelay, maxDelay]);

  const stop = useCallback(() => {
    window.clearTimeout(timeoutId.current!);
    setIsActive(false);
  }, []);

  const toggle = useCallback(() => {
    if (active) {
      stop();
    } else {
      start();
    }
  }, [active, start, stop]);

  return { start, stop, toggle, active };
};
