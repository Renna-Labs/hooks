import { useState, useEffect } from 'react';
import { isClient, isAPISupported } from './utils';

const errorMessage =
    'matchMedia is not supported, this could happen both because window.matchMedia is not supported by' +
    " your current browser or you're using the useMediaQuery hook whilst server side rendering.";

/**
 * Accepts a media query string then uses the
 * [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API to determine if it
 * matches with the current document.<br />
 * It also monitor the document changes to detect when it matches or stops matching the media query.<br />
 * Returns the validity state of the given media query.
 *
 */
export const useMediaQuery = (mediaQuery: string): boolean | null => {
    if (!isClient || !isAPISupported('matchMedia')) {
        console.warn(errorMessage);
        return null;
    }

    const [isVerified, setIsVerified] = useState<boolean>(
        !!window.matchMedia(mediaQuery).matches
    );

    useEffect(() => {
        const mediaQueryList = window.matchMedia(mediaQuery);
        const documentChangeHandler = () =>
            setIsVerified(!!mediaQueryList.matches);

        mediaQueryList.addListener(documentChangeHandler);

        documentChangeHandler();
        return () => {
            mediaQueryList.removeListener(documentChangeHandler);
        };
    }, [mediaQuery]);

    return isVerified;
};