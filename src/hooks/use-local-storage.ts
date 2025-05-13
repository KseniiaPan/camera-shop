import { useState, useEffect } from 'react';
import {CartProduct} from '../types/product-types';

function getStoredCart(key: string) {
  const storedCart = localStorage.getItem(key);
  if (storedCart !== null) {
    const cart = JSON.parse(storedCart) as CartProduct[];
    return cart;
  }

  return undefined;
}

export const useLocalStorage = (key: string) => {
  const [cart, setCart] = useState(() => getStoredCart(key));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cart));
  }, [key, cart]);

  return [cart, setCart];
};
