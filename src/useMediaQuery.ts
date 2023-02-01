import { useState, useEffect } from 'react';
import { isClient, isAPISupported } from './utils';

function getInitialValue(query: string) {
  if (isClient && isAPISupported('matchMedia')) {
    return window.matchMedia(query).matches;
  }

  return false;
}

type IsMediaQueryReturnType = boolean | null;

/**
 * Accepts a media query string then uses the
 * [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API to determine if it
 * matches with the current document.<br />
 * It also monitor the document changes to detect when it matches or stops matching the media query.<br />
 * Returns the validity state of the given media query.
 *
 */
export const useMediaQuery = (mediaQuery: string): IsMediaQueryReturnType => {
  const [matches, setMatches] = useState<boolean>(getInitialValue(mediaQuery));

  useEffect(() => {
    if (isClient && isAPISupported('matchMedia')) {
      const mediaQueryList = window.matchMedia(mediaQuery);
      const documentChangeHandler = () => setMatches(!!mediaQueryList.matches);

      mediaQueryList.addListener(documentChangeHandler);

      documentChangeHandler();
      return () => {
        mediaQueryList.removeListener(documentChangeHandler);
      };
    }

    return undefined;
  }, [mediaQuery]);

  return matches;
};
