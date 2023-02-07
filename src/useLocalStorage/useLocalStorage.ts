import { useCallback, useState } from 'react';
import { useWindowEvent } from '../useWindowEvent/useWindowEvent';

function serializeJSON<T>(value: T) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw new Error('@rennalabs/hooks - useLocalStorage: Failed to serialize the value');
  }
}

function deserializeJSON(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function useLocalStorage(key: string, defaultValue: string) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') return defaultValue;
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return defaultValue
      return item ? deserializeJSON(item) : defaultValue;
    } catch (error) {
      console.log('@rennalabs/hooks - useLocalStorage: Failed to read the value');
      return defaultValue;
    }
  });

  const setValue = useCallback(
    (value: any) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, serializeJSON(valueToStore));
      } catch (error) {
        throw new Error('@rennalabs/hooks useLocalStorage: Failed to set the value');
      }
    },
    [key],
  );

  const removeValue = useCallback(() => {
    window.localStorage.removeItem(key);
  }, []);

  // update state when storage changes (e.g. in another tab)
  useWindowEvent('storage', event => {
    if (event.storageArea === window.localStorage && event.key === key && event.newValue) {
      setValue(deserializeJSON(event.newValue));
    }
  });

  return [storedValue, setValue, removeValue] as const;
}
