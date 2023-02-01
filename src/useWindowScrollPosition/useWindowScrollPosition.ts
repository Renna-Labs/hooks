import React, { useState, useEffect } from 'react';
import { throttle } from '../utils';

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseWindowScrollPositionProps {
  throttleMs?: number;
}

export const useWindowScrollPosition = (
  options: UseWindowScrollPositionProps = {},
): ScrollPosition => {
  const { throttleMs = 100 } = options;
  const [scroll, setScroll] = useState<ScrollPosition>({
    x: window.pageXOffset,
    y: window.pageYOffset,
  });

  const handle = throttle(() => {
    setScroll({
      x: window.pageXOffset,
      y: window.pageYOffset,
    });
  }, throttleMs);

  useEffect(() => {
    window.addEventListener('scroll', handle);

    return () => {
      window.removeEventListener('scroll', handle);
    };
  }, []);

  return scroll;
};
