import { useState, useCallback } from 'react';
import { getStoredValue } from '../utils/common';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [storedValue, setStroredValue] = useState<T | undefined>(() =>
    getStoredValue<T>(key, defaultValue)
  );

  const setValue = useCallback(
    (newValue: T) => {
      try {
        setStroredValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {}
    },
    [key]
  );

  return [storedValue, setValue] as const;
};
