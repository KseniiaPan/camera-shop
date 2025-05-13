import { useState, useEffect } from 'react';
import {CartProduct} from '../types/product-types';

function getStoredCart(key: string, defaultValue: CartProduct[]) {
  const storedCart = localStorage.getItem(key);
  if (storedCart !== null) {
    const cart = JSON.parse(storedCart) as CartProduct[];
    return cart;
  }

  return defaultValue;
}

export const useLocalStorage = (key: string) => {
  const [cart, setCart] = useState<CartProduct[]>(() => getStoredCart(key, []));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cart));
  }, [key, cart]);

  return [cart, setCart];
};
