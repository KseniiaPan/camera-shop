import { useState } from 'react';
import { ProductInfo } from '../../types/product-types';
import {
  BasketCardOption,
  BASKET_PRODUCTS_MIN_COUNT,
  BASKET_PRODUCTS_MAX_COUNT,
} from '../../consts';
import { getFormattedPrice } from '../../utils/common';
import { useLocalStorage } from '../../hooks/use-local-storage';
import BasketItem from '../../components/basket-item/basket-item';

type BasketProductCardProps = {
  onRemoveProductModalOpen?: (id: number | null) => void;
  openedCameraInfo: ProductInfo;
};

function BasketProductCard({
  onRemoveProductModalOpen,
  openedCameraInfo,
}: BasketProductCardProps): JSX.Element {
  const { price, id, quantity } = openedCameraInfo;
  const [cart, setCart] = useLocalStorage<ProductInfo[]>('cart', []);
  const [productQuantity, setProductQuantity] = useState<number | undefined>(
    quantity
  );

  const formattedPrice = getFormattedPrice(price);
  const totalPrice = productQuantity && price * productQuantity;
  const formattedTotalPrice = totalPrice && getFormattedPrice(totalPrice);

  const isDecreaseButtonDisabled =
    productQuantity === BASKET_PRODUCTS_MIN_COUNT;
  const isIncreaseButtonDisabled =
    productQuantity === BASKET_PRODUCTS_MAX_COUNT;

  const handleIncreaseClick = (product: ProductInfo) => {
    if (cart) {
      const newCart = cart.map((cartItem) => ({ ...cartItem }));
      const productInCart = newCart.find((item) => product.name === item.name);
      if (productInCart && productInCart.quantity) {
        productInCart.quantity++;
        setCart(newCart);
        setProductQuantity(productInCart.quantity);
      }
    }
  };

  const handleDecreaseClick = (product: ProductInfo) => {
    if (cart) {
      const newCart = cart.map((cartItem) => ({ ...cartItem }));
      const productInCart = newCart.find((item) => product.name === item.name);
      if (productInCart && productInCart.quantity) {
        productInCart.quantity--;
        setProductQuantity(productInCart.quantity);
        setCart(newCart);
      }
    }
  };

  const handleProductQuantityChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (evt.target.value !== undefined && evt.target.value.length > 0 && cart) {
      if (Number(evt.target.value) < BASKET_PRODUCTS_MIN_COUNT) {
        evt.target.value = BASKET_PRODUCTS_MIN_COUNT.toString();
      }
      if (Number(evt.target.value) > BASKET_PRODUCTS_MAX_COUNT) {
        evt.target.value = BASKET_PRODUCTS_MAX_COUNT.toString();
      }
      const newCart = cart.map((cartItem) => ({ ...cartItem }));
      const productInCart = newCart.find((item) => id === item.id);
      if (productInCart) {
        productInCart.quantity = Number(evt.target.value);
        setProductQuantity(productInCart.quantity);
        setCart(newCart);
      }
    }
  };
  return (
    <>
      <BasketItem
        openedCameraInfo={openedCameraInfo}
        basketCardOption={BasketCardOption.Basket}
      />
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {formattedPrice} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={() => handleDecreaseClick(openedCameraInfo)}
          disabled={isDecreaseButtonDisabled}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          defaultValue={productQuantity}
          key={productQuantity}
          min={1}
          max={99}
          aria-label="количество товара"
          onBlur={handleProductQuantityChange}
          onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) =>
            evt.key === 'Enter' && (evt.target as HTMLInputElement).blur()}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => handleIncreaseClick(openedCameraInfo)}
          disabled={isIncreaseButtonDisabled}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {formattedTotalPrice} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => onRemoveProductModalOpen && onRemoveProductModalOpen(id)}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </>
  );
}

export default BasketProductCard;
