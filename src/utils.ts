export function throttle(
    func: (arg: any) => void,
    threshold = 250,
    scope?: any,
): (arg: any) => void {
    let last, deferTimer;

    return function (arg) {
        let context = scope || arg;

        let now = Date.now(),
            args = arguments;
        if (last && now < last + threshold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                func.apply(context, args);
            }, threshold);
        } else {
            last = now;
            func.apply(context, args);
        }
    };
}

/**
 * Exports a boolean value reporting whether the given API is supported or not
 */
export const isAPISupported = (api: string): boolean => api in window;

/**
 * Exports a boolean value reporting whether is client side or server side by checking on the window object
 */
export const isClient: boolean = typeof window === 'object';
