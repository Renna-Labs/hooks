import { useState, useEffect } from 'react';
import { throttle } from './utils';

const events = new Set<() => void>();
const onResize = () => events.forEach(fn => fn());

export const useWindowSize = (options: { throttleMs?: number } = {}) => {
  const { throttleMs = 100 } = options;
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handle = throttle(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, throttleMs);

  useEffect(() => {
    if (events.size === 0) {
      window.addEventListener('resize', onResize, true);
    }

    // @ts-ignore
    events.add(handle);

    return () => {
      // @ts-ignore
      events.delete(handle);

      if (events.size === 0) {
        window.removeEventListener('resize', onResize, true);
      }
    };
  }, []);

  return size;
};
