export function throttle<T extends (...args: any[]) => void>(
  func: T,
  threshold: number = 250,
  scope?: any,
): T {
  let last: number, deferTimer: number;
  return function (this: any) {
    let context = scope || this;

    let now = Date.now(),
      args = arguments;
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer);
      // @ts-ignore
      deferTimer = setTimeout(function () {
        last = now;
        // @ts-ignore
        func.apply(context, args);
      }, threshold);
    } else {
      last = now;
      // @ts-ignore
      func.apply(context, args);
    }
  } as T;
}

/**
 * Exports a boolean value reporting whether the given API is supported or not
 */
export const isAPISupported = (api: string): boolean => api in window;

/**
 * Exports a boolean value reporting whether is client side or server side by checking on the window object
 */
export const isClient: boolean = typeof window === 'object';
