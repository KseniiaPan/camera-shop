import { ProductInfo } from '../../types/product-types';
import {
  BasketCardOption,
  BASKET_PRODUCTS_MIN_COUNT,
  BASKET_PRODUCTS_MAX_COUNT,
} from '../../consts';
import { getFormattedPrice, getStoredValue } from '../../utils/common';
import BasketItem from '../../components/basket-item/basket-item';
import { useAppSelector } from '../../hooks/index';
import { getOrderPostingStatus } from '../../store/order-process/selectors';

type BasketProductCardProps = {
  onRemoveProductModalOpen: (id: number | null) => void;
  openedCameraInfo: ProductInfo;
  onIncreaseClick: (product: ProductInfo) => void;
  onDecreaseClick: (product: ProductInfo) => void;
  onProductQuantityChange: (
    evt: React.ChangeEvent<HTMLInputElement>,
    product: ProductInfo
  ) => void;
};

function BasketProductCard({
  onRemoveProductModalOpen,
  onIncreaseClick,
  onDecreaseClick,
  onProductQuantityChange,
  openedCameraInfo,
}: BasketProductCardProps): JSX.Element {
  const { price, id } = openedCameraInfo;

  const storedCartProducts = getStoredValue<ProductInfo[]>('cart', []);
  const storedCartProductInfo =
    storedCartProducts &&
    storedCartProducts.find(
      (storedCartProductsItem) => storedCartProductsItem.id === id
    );
  const formattedProductPrice = getFormattedPrice(price);
  const totalBasketPrice =
    storedCartProductInfo &&
    storedCartProductInfo.quantity &&
    price * storedCartProductInfo.quantity;
  const formattedBasketTotalPrice =
    totalBasketPrice && getFormattedPrice(totalBasketPrice);

  const isOrderPosting = useAppSelector(getOrderPostingStatus);

  const isDecreaseButtonDisabled =
    (storedCartProductInfo &&
      storedCartProductInfo.quantity === BASKET_PRODUCTS_MIN_COUNT) ||
    isOrderPosting;
  const isIncreaseButtonDisabled =
    (storedCartProductInfo &&
      storedCartProductInfo.quantity === BASKET_PRODUCTS_MAX_COUNT) ||
    isOrderPosting;

  return (
    <>
      <BasketItem
        openedCameraInfo={openedCameraInfo}
        basketCardOption={BasketCardOption.Basket}
      />
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {formattedProductPrice} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={() => onDecreaseClick(openedCameraInfo)}
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
          defaultValue={storedCartProductInfo && storedCartProductInfo.quantity}
          key={storedCartProductInfo && storedCartProductInfo.quantity}
          min={1}
          max={99}
          aria-label="количество товара"
          onBlur={(evt) => onProductQuantityChange(evt, openedCameraInfo)}
          onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) =>
            evt.key === 'Enter' && (evt.target as HTMLInputElement).blur()}
          disabled={isOrderPosting}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => onIncreaseClick(openedCameraInfo)}
          disabled={isIncreaseButtonDisabled}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {formattedBasketTotalPrice} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => onRemoveProductModalOpen && onRemoveProductModalOpen(id)}
        disabled={isOrderPosting}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </>
  );
}

export default BasketProductCard;
