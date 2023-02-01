# Renna Labs' Hooks

[![npm version](https://badge.fury.io/js/@rennalabs%2Fhooks.svg)](https://badge.fury.io/js/@rennalabs%2Fhooks)

A library of useful hooks.

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
  - [`useRandomInterval()`](#useRandomInterval)
  - [`useInterval()`](#useInterval)
  - [`useTimeout()`](#useTimeout)
  - [`useCounter()`](#useCounter)
  - [`useHover()`](#useHover)
  - [`useOs()`](#useOs)

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

  // ...
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

  // ...
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

  // ...
};
```

### `useLocalStorage()`

#### Arguments

- `key: string`: Key to the value in local storage
- `value: string`: value to the key in local storage

#### Returns

Array containing:

- [name]: Value to the key in local storage
- [setName]: Setter function to the provided key

#### Example

```js
import { useLocalStorage } from '@rennalabs/hooks';

const Example = () => {
  // Similar to useState but first arg is key
  // to the value in local storage.
  const [name, setName] = useLocalStorage('name', 'Bob');

  // ...
};
```

### `useOnClickOutside()`

#### Arguments

- `ref: useRef`: A ref to an element created with useRef
- `func: function`: a function to be fired within an effect when a click outside the ref is detected

#### Example

```js
import { useOnClickOutside } from '@rennalabs/hooks';

const Example = () => {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  // State for our modal
  const [isModalOpen, setModalOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setModalOpen(false));

  // ...
};
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

### `useRandomInterval()`

A hook itended for animations and microinteractions that fire on a spontaneous interval. [More info here...](https://joshwcomeau.com/snippets/react-hooks/use-random-interval)

#### Arguments

- `callback: function`
- `minDelay?: number`
- `maxDelay?: number`

#### Example

```js
import { useRandomInterval } from '@rennalabs/hooks';

function LaggyClock() {
  // Update between every 1 and 4 seconds
  const delay = [1000, 4000];

  const [currentTime, setCurrentTime] = React.useState(Date.now);

  useRandomInterval(() => setCurrentTime(Date.now()), ...delay);

  return <>It is currently {new Date(currentTime).toString()}.</>;
}
```

### `useInterval()`

A hook based on [Dan Abramov's blog post](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) about `setInterval`.

#### Arguments

- `callback: function`
- `delay: number`

#### Example

```js
import { useInterval } from '@rennalabs/hooks';

function Example() {
  let [count, setCount] = useState(0);
  let [delay, setDelay] = useState(1000);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, delay);

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  return (
    <Demo>
      {count}
      <input value={delay} onChange={handleDelayChange} />
    </Demo>
  );
}
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

useOs detects user's os. Possible values are: undetermined, macos, ios, windows, android, linux. If os cannot be identified, for example, during server side rendering undetermined will be returned.

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

---

[![CircleCI](https://circleci.com/gh/Renna-Labs/hooks.svg?style=svg)](https://circleci.com/gh/Renna-Labs/hooks)

MIT License
