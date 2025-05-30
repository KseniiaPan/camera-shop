import { useState, useCallback } from 'react';
import { getStoredValue } from '../utils/common';
import { toast } from 'react-toastify';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [storedValue, setStroredValue] = useState<T | undefined>(() =>
    getStoredValue<T>(key, defaultValue)
  );

  const setValue = useCallback(
    (newValue: T) => {
      try {
        setStroredValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        toast.error('Ошибка при сохранении в localStorage. Вероятно превышен лимита хранилища.');
      }
    },
    [key]
  );

  return [storedValue, setValue] as const;
};
