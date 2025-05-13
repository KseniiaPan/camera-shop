import { useState, useEffect } from 'react';

function getStoredCart(key: string, defaultValue: []) {
  const storedCart = localStorage.getItem(key);
  if (storedCart) {
    const cart = JSON.parse(storedCart);
    return cart;
  }

  return defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: []) => {
  const [cart, setCart] = useState(() => {
    return getStoredCart(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cart));
  }, [key, cart]);

  return [cart, setCart];
};
