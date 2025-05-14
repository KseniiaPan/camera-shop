import { useState, useCallback } from 'react';
import { getStoredCart } from '../utils/common';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [storedCart, setStroredCart] = useState<T | undefined>(() =>
    getStoredCart<T>(key, defaultValue)
  );

  const setCart = useCallback(
    (newValue: T) => {
      try {
        setStroredCart(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {}
    },
    [key]
  );

  return [storedCart, setCart] as const;
};
