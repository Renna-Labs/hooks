# Renna Labs' Hooks

[![npm version](https://badge.fury.io/js/@rennalabs%2Fhooks.svg)](https://badge.fury.io/js/@rennalabs%2Fhooks)

A library of react hooks for state and UI management.

## Install

> Note: React 16.8+ is required for Hooks.

### With npm

```sh
npm i @rennalabs/hooks --save
```

### Or with yarn

```sh
yarn add @rennalabs/hooks
```

## API

- [Hooks](#hooks)

  - [`useNetworkStatus()`](#useNetworkStatus)
  - [`useWindowScrollPosition()`](#useWindowScrollPosition)
  - [`useWindowSize()`](#useWindowSize)
  - [`useLocalStorage()`](#useLocalStorage)
  - [`useOnClickOutside()`](#useOnClickOutside)
  - [`useMediaQuery()`](#useMediaQuery)
  - [`usePrefersReducedMotion()`](#usePrefersReducedMotion)
  - [`useTimeout()`](#useTimeout)
  - [`useInterval()`](#useInterval)
  - [`useRandomInterval()`](#useRandomInterval)
  - [`useCounter()`](#useCounter)
  - [`useHover()`](#useHover)
  - [`useOs()`](#useOs)
  - [`useMousePosition()`](#useMousePosition)
  - [`useFullscreen()`](#useFullscreen)
  - [`useIdle()`](#useIdle)
  - [`useCookie()`](#useCookie)
  - [`useDocumentTitle()`](#useDocumentTitle)
  - [`useDocumentVisibility()`](#useDocumentVisibility)
  - [`useGeolocation()`](#useGeolocation)
  - [`useIsomorphicEffect()`](#useIsomorphicEffect)
  - [`useWindowEvent()`](#useWindowEvent)

## Hooks

### `useNetworkStatus()`

Retrieve network status from the browser.

#### Returns

Object containing:

- `isOnline: boolean`: `true` if the browser has network access. `false`
  otherwise.

- `offlineAt?: Date`: Date when network connection was lost.

#### Example

```js
import { useNetworkStatus } from '@rennalabs/hooks';

const Example = () => {
  const { isOnline, offlineAt } = useNetworkStatus();

  return (
    <div style={{ background: isOnline ? 'green' : 'red' }}>
      {`App went offline at ${offlineAt.toString()}`}
    </div>
  );
};
```

### `useWindowScrollPosition()`

#### Returns

Object containing:

- `x: number`: Horizontal scroll in pixels (`window.pageXOffset`).
- `y: number`: Vertical scroll in pixels (`window.pageYOffset`).

#### Example

```js
import { useWindowScrollPosition } from '@rennalabs/hooks';

const Example = () => {
  const { x, y } = useWindowScrollPosition();

  return <div>{`Scroll position is { x: ${x}, y: ${y} }`}</div>;
};
```

### `useWindowSize()`

#### Returns

Object containing:

- `width`: Width of browser viewport (`window.innerWidth`)
- `height`: Height of browser viewport (`window.innerHeight`)

#### Example

```js
import { useWindowSize } from '@rennalabs/hooks';

const Example = () => {
  const { width, height } = useWindowSize();

  return <div>{`window size is ${width}x${height}`}</div>;
};
```

### `useLocalStorage()`

Allows you to use value from localStorage as react state. Hook works the same way as useState, but also writes the value to localStorage. Subscribes to the `storage` event. When state changes in one tab, it automatically updates value in all other opened browser tabs.

#### Arguments

- `key: string`: Key to the value in local storage
- `defaultValue: string`: Default value for the provided key

#### Returns

Array containing:

- [value]: Value to the key in localStorage.
- [setValue]: Setter function to the provided key
- [removeValue]: Callback to remove key/value from localStorage

#### Example

```js
import { useLocalStorage } from '@rennalabs/hooks';

const Example = () => {
  // Similar to useState but first arg is key
  // to the value in local storage.
  const [value, setValue, removeValue] = useLocalStorage('keyName', 'keyValue');

  return (
    <div>
      <h1>{`Saved value: ${value}`}</h1>
      <input onChange={e => setValue(e.target.value)} />
      <button onClick={removeValue}>Clear Storage</button>
    </div>
  );
};
```

### `useOnClickOutside()`

#### Arguments

- `handler: function`: function that will be called on outside click.
- `events?: string[]`: optional list of events that indicate outside click.
- `nodes?: HTMLElement[]`: optional list of nodes that should not trigger outside click event.

Hook returns React ref object that should be passed to element on which outside clicks should be captured.

#### Example

```js
import { useState } from 'react';
import { useOnClickOutside } from '@rennalabs/hooks';

function Demo() {
  const [opened, setOpened] = useState(false);
  const ref = useOnClickOutside(() => setOpened(false));

  return (
    <>
      <button onClick={() => setOpened(true)}>Open dropdown</button>

      {opened && (
        <DropDown ref={ref}>
          <span>Click outside to close</span>
        </DropDown>
      )}
    </>
  );
}
```

#### Example with Events

```js
import { useState } from 'react';
import { useOnClickOutside } from '@rennalabs/hooks';

function Demo() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false), ['mouseup', 'touchend']);

  return (
    <>
      <button onClick={() => setOpened(true)}>Open dropdown</button>

      {opened && (
        <DropDown ref={ref}>
          <span>Click outside to close</span>
        </DropDown>
      )}
    </>
  );
}
```

#### Example with nodes

```js
import { useState } from 'react';
import { useOnClickOutside } from '@rennalabs/hooks';

function Demo() {
  const [dropdown, setDropdown] = useState(null);
  const [control, setControl] = useState(null);

  useClickOutside(() => console.log('clicked outside'), null, [control, dropdown]);

  return (
    <div>
      <div ref={setControl}>Control</div>
      <div>
        <div ref={setDropdown}>Dropdown</div>
      </div>
    </div>
  );
}
```

### `useMediaQuery()`

Accepts a media query string then uses the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API to determine if it matches with the current document.

#### Arguments

- `string: media query string`:

#### Example

```js
import { useMediaQuery } from '@rennalabs/hooks';

const Example = () => {
  const isSmall = useMediaQuery('(max-width: 48rem)');
  const isLarge = useMediaQuery('(min-width: 48rem)');

  return (
    <Demo>
      <p>Small view? {isSmall ? 'yes' : 'no'}</p>
      <p>Large view? {isLarge ? 'yes' : 'no'}</p>
    </Demo>
  );
};
```

### `usePrefersReducedMotion()`

A hook to allow access to the CSS media query `prefers-reduced-motion`.

#### Example

```js
import { usePrefersReducedMotion } from '@rennalabs/hooks';

const Example = ({ isBig }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const styles = {
    transform: isBig ? 'scale(2)' : 'scale(1)',
    transition: prefersReducedMotion ? undefined : 'transform 300ms',
  };

  return <Demo styles={styles}>Stuff</Demo>;
};
```

### `useTimeout()`

A declarative adaptation of `setTimeout` based on [Dan Abramov's blog post](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) about `setInterval`

#### Arguments

- `callback: function`
- `delay: number`

#### Example

```js
import { useTimeout } from '@rennalabs/hooks';

function Example() {
  const [message, setMessage] = useState('changing in 2 seconds...');

  useTimeout(() => setMessage('changed!'), 2000);

  return <Demo>{message}</Demo>;
}
```

### `useInterval()`

A hook wrapper around window.setInterval

#### Arguments

- `callback: function`
- `delay: number`

#### Example

```js
import { useState, useEffect } from 'react';
import { useInterval } from '@rennalabs/hooks';

function Demo() {
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds(s => s + 1), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <div>
      <h1>
        Page loaded <b>{seconds}</b> seconds ago
      </h1>
      <button onClick={interval.toggle} style={{ color: interval.active ? 'red' : 'green' }}>
        {interval.active ? 'Stop' : 'Start'} counting
      </button>
    </div>
  );
}
```

### `useRandomInterval()`

A hook itended for animations and microinteractions that fire on a spontaneous interval.

#### Arguments

- `callback: function`
- `minDelay?: number`
- `maxDelay?: number`

#### Example

```js
import { useState, useEffect } from 'react';
import { useRandomInterval } from '@rennalabs/hooks';

function LaggyTimer() {
  // Update between every 1 and 4 seconds
  const delay = [1000, 4000];
  const [seconds, setSeconds] = useState(0);

  const interval = useRandomInterval(() => setSeconds(s => s + 1), ...delay);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <div>
      <h1>It has been {seconds} seconds.</h1>
      <button onClick={interval.toggle} style={{ color: interval.active ? 'red' : 'green' }}>
        {interval.active ? 'Stop' : 'Start'} counting
      </button>
    </div>
  );
}
```

### `useCounter()`

Increment/decrement state within given boundaries.

#### Arguments

- `initialCount: number`
- `clamp: { min: number; max: number; }`

#### Example

```js
import { useCounter } from '@rennalabs/hooks';

function Demo() {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });

  return (
    <>
      <h1>Count: {count}</h1>
      <div>
        <button onClick={handlers.increment}>Increment</button>
        <button onClick={handlers.decrement}>Decrement</button>
        <button onClick={handlers.reset}>Reset</button>
        <button onClick={() => handlers.set(5)}>Set 5</button>
      </div>
    </>
  );
}
```

### `useHover()`

Detect if mouse is over given element.

#### Example

```js
import { useHover } from '@rennalabs/hooks';

function Demo() {
  const { hovered, ref } = useHover();

  return <div ref={ref}>{hovered ? 'I am hovered' : 'Hover over me please'}</div>;
}
```

### `useOs()`

useOs detects user's operating system. Possible values are: undetermined, macos, ios, windows, android, linux. If os cannot be identified, for example, during server side rendering undetermined will be returned.

#### Example

```js
import { useOs } from '@rennalabs/hooks';

function Demo() {
  const os = useOs();
  return (
    <>
      Your operating system is <b>{os}</b>
    </>
  );
}
```

### `useMousePosition()`

Get mouse position relative to viewport or given element.

#### Example

```js
import { useMousePosition } from '@rennalabs/hooks';

function Demo() {
  const { ref, x, y } = useMousePosition();

  return (
    <>
      Mouse coordinates are <b>{`{ x: ${x}, y: ${y} }`}</b>
    </>
  );
}
```

### `useFullscreen()`

useFullscreen allows to enter/exit fullscreen for given element using the Fullscreen API. By default, if you don't provide ref, hook will target document.documentElement:

#### Example

```js
import { useFullscreen } from '@rennalabs/hooks';

function Demo() {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <button onClick={toggle} style={{ color: fullscreen ? 'red' : 'green' }}>
      {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    </button>
  );
}
```

#### Example with custom element

```js
import { useFullscreen } from '@rennalabs/hooks';

function Demo() {
  const { ref, toggle, fullscreen } = useFullscreen();

  return (
    <>
      <img
        ref={ref}
        src="https://unsplash.com/image.jpg"
        alt="Unsplash Image to make Fullscreen"
        width={200}
      />

      <button onClick={toggle} style={{ color: fullscreen ? 'red' : 'green' }}>
        {fullscreen ? 'Exit Fullscreen' : 'View Image Fullscreen'}
      </button>
    </>
  );
}
```

### `useIdle()`

Detects if user does nothing for given time in ms:

#### Example

```js
import { useIdle } from '@rennalabs/hooks';

function Demo() {
  const idle = useIdle(2000);

  return <div>Current state: {idle ? 'idle' : 'not idle'}</div>;
}
```

### `useCookie()`

Returns the current value of a cookie, a callback to update the cookie and a callback to delete the cookie.

#### Example

```js
import { useCookie } from '@rennalabs/hooks';

function Demo() {
  const [value, updateCookie, deleteCookie] = useCookie('my-cookie');

  const updateCookieHandler = () => {
    updateCookie('new-cookie-value');
  };

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={updateCookieHandler}>Update Cookie</button>

      <button onClick={deleteCookie}>Delete Cookie</button>
    </div>
  );
}
```

### `useDocumentTitle()`

Sets document.title property with React's useLayoutEffect hook. Hook is not called during server side rendering. Use this hook with client only applications. Call hook with string that should be set as document title inside any component. Hook is triggered every time value changes and value is not empty string (trailing whitespace is trimmed) or null.

#### Example

```js
import { useState } from 'react';
import { useDocumentTitle } from '@rennalabs/hooks';

function Demo() {
  const [title, setTitle] = useState('');
  useDocumentTitle(title);

  return <button onClick={() => setTitle('new title')}>Set document title</button>;
}
```

### `useDocumentVisibility()`

Returns current document.visibilityState – it allows to detect if current tab is active.

#### Example

```js
import { useDocumentTitle, useDocumentVisibility } from '@rennalabs/hooks';

function Demo() {
  const documentState = useDocumentVisibility();
  useDocumentTitle(`Document is ${documentState}`);

  return <div>Switch to another tab to see document title change</div>;
}
```

### `useGeolocation()`

Returns user's geographic location. This hook accepts [position options](https://developer.mozilla.org/docs/Web/API/PositionOptions).

#### Example

```js
import { useGeolocation } from '@rennalabs/hooks';

function Demo() {
  const { loading, error, latitude, longitude } = useGeolocation();

  if (loading) return 'loading...';
  if (error) return 'error';

  return (
    <div>
      Your location is {latitude} x {longitude}
    </div>
  );
}
```

### `useIsomorphicEffect()`

Allows you to switch between useEffect during server side rendering and useLayoutEffect after hydration. Use it wherever you would use useLayoutEffect to avoid warnings during ssr.

#### Example

```js
import { useIsomorphicEffect } from '@rennalabs/hooks';

function Demo() {
  useIsomorphicEffect(() => {
    document.title = 'title';
  });

  return null;
}
```

### `useWindowEvent()`

Adds an event listener to `window` object on component mount and removes it on unmount:

#### Example

```js
import { useEffect } from 'react';
import { useWindowEvent } from '@rennalabs/hooks';

const handler = event => console.log(event);

// regular way
useEffect(() => {
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);

// with use-window-event hook
useWindowEvent('keydown', handler);
```

---

[![CircleCI](https://circleci.com/gh/Renna-Labs/hooks.svg?style=svg)](https://circleci.com/gh/Renna-Labs/hooks)

MIT License
