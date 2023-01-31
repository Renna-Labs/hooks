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

-   [Hooks](#hooks)

    -   [`useNetworkStatus()`](#useNetworkStatus)
    -   [`useWindowScrollPosition()`](#useWindowScrollPosition)
    -   [`useWindowSize()`](#useWindowSize)
    -   [`useLocalStorage()`](#useLocalStorage)
    -   [`useOnClickOutside()`](#useOnClickOutside)
    -   [`useMediaQuery()`](#useMediaQuery)
    -   [`usePrefersReducedMotion()`](#usePrefersReducedMotion)
    -   [`useRandomInterval()`](#useRandomInterval)
    -   [`useInterval()`](#useInterval)
    -   [`useTimeout()`](#useTimeout)

## Hooks

### `useNetworkStatus()`

Retrieve network status from the browser.

#### Returns

Object containing:

-   `isOnline: boolean`: `true` if the browser has network access. `false`
    otherwise.

-   `offlineAt?: Date`: Date when network connection was lost.

#### Example

```js
import { useNetworkStatus } from '@echoghi/hooks';

const Example = () => {
    const { isOnline, offlineAt } = useNetworkStatus();

    // ...
};
```

### `useWindowScrollPosition()`

#### Returns

Object containing:

-   `x: number`: Horizontal scroll in pixels (`window.pageXOffset`).
-   `y: number`: Vertical scroll in pixels (`window.pageYOffset`).

#### Example

```js
import { useWindowScrollPosition } from '@echoghi/hooks';

const Example = () => {
    const { x, y } = useWindowScrollPosition();

    // ...
};
```

### `useWindowSize()`

#### Returns

Object containing:

-   `width`: Width of browser viewport (`window.innerWidth`)
-   `height`: Height of browser viewport (`window.innerHeight`)

#### Example

```js
import { useWindowSize } from '@echoghi/hooks';

const Example = () => {
    const { width, height } = useWindowSize();

    // ...
};
```

### `useLocalStorage()`

#### Arguments

-   `key: string`: Key to the value in local storage
-   `value: string`: value to the key in local storage

#### Returns

Array containing:

-   [name]: Value to the key in local storage
-   [setName]: Setter function to the provided key

#### Example

```js
import { useLocalStorage } from '@echoghi/hooks';

const Example = () => {
    // Similar to useState but first arg is key
    // to the value in local storage.
    const [name, setName] = useLocalStorage('name', 'Bob');

    // ...
};
```

### `useOnClickOutside()`

#### Arguments

-   `ref: useRef`: A ref to an element created with useRef
-   `func: function`: a function to be fired within an effect when a click outside the ref is detected

#### Example

```js
import { useOnClickOutside } from '@echoghi/hooks';

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

-   `string: media query string`:

#### Example

```js
import { useMediaQuery } from '@echoghi/hooks';

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
import { usePrefersReducedMotion } from '@echoghi/hooks';

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

-   `callback: function`
-   `minDelay?: number`
-   `maxDelay?: number`

#### Example

```js
import { useRandomInterval } from '@echoghi/hooks';

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

-   `callback: function`
-   `delay: number`

#### Example

```js
import { useInterval } from '@echoghi/hooks';

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

-   `callback: function`
-   `delay: number`

#### Example

```js
import { useTimeout } from '@echoghi/hooks';

function Example() {
    const [message, setMessage] = useState('changing in 2 seconds...');

    useTimeout(() => setMessage('changed!'), 2000);

    return <Demo>{message}</Demo>;
}
```

---

[![CircleCI](https://circleci.com/gh/echoghi/hooks.svg?style=svg)](https://circleci.com/gh/echoghi/hooks)

MIT License
