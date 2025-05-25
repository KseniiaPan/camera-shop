import { Helmet } from 'react-helmet-async';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import BasketProductCard from '../../components/basket-product-card/basket-product-card';
import RemoveProductModal from '../../components/remove-product-modal/remove-product-modal';
import OrderSuccessModal from '../../components/order-success-modal/order-success-modal';
import ErrorMessage from '../../components/errorMessage/error-message';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Preloader from '../../components/preloader/preloader';
import { ProductInfo, ProductModalData } from '../../types/product-types';
import {
  ErrorText,
  BASKET_PRODUCTS_MIN_COUNT,
  BASKET_PRODUCTS_MAX_COUNT,
} from '../../consts';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { getStoredValue } from '../../utils/common';
import { changeCartProductsAmount } from '../../store/order-process/order-process';
import { postOrderAction } from '../../store/api-actions';
import { getPromoProductsData } from '../../store/promo-process/selectors';
import { getOrderPostingStatus } from '../../store/order-process/selectors';
import {
  getBasketProdutsAmount,
  getNonPromoBasketProducts,
  getSummedPrice,
  getProductsQuantity,
  getDiscountForQuantity,
  getReducedDiscount,
  getOrderedProductsIds,
} from '../../utils/basket-calculation';

const initialRemoveProductModalState: ProductModalData = {
  isModalOpen: false,
  openedCameraId: null,
};

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [cart, setCart] = useLocalStorage<ProductInfo[]>('cart', []);
  const [removeProductModalData, setDeleteProductModalData] = useState(
    initialRemoveProductModalState
  );
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);

  const currentBasketProducts = getStoredValue<ProductInfo[]>('cart', []);
  const currentPromoProducts = useAppSelector(getPromoProductsData);

  const isOrderPosting = useAppSelector(getOrderPostingStatus);

  const isOrderButtonDisabled =
    !currentBasketProducts ||
    currentBasketProducts.length === 0 ||
    isOrderPosting;

  const basketProductsTotalCost =
    currentBasketProducts && getSummedPrice(currentBasketProducts);

  const nonPromoBasketProducts =
    currentBasketProducts &&
    currentPromoProducts &&
    getNonPromoBasketProducts(currentBasketProducts, currentPromoProducts);

  const nonPromoBasketProductsTotalCost =
    nonPromoBasketProducts && getSummedPrice(nonPromoBasketProducts);

  const nonPromoBasketProductsQuantity =
    nonPromoBasketProducts && getProductsQuantity(nonPromoBasketProducts);

  const expectedDiscount =
    nonPromoBasketProductsQuantity &&
    getDiscountForQuantity(nonPromoBasketProductsQuantity);

  const reducedDiscount =
    expectedDiscount &&
    nonPromoBasketProductsTotalCost &&
    getReducedDiscount(expectedDiscount, nonPromoBasketProductsTotalCost);

  const nonPromoBasketProductsDiscount =
    nonPromoBasketProductsTotalCost &&
    reducedDiscount &&
    nonPromoBasketProductsTotalCost * (reducedDiscount / 100);

  const finalCost =
    basketProductsTotalCost && nonPromoBasketProductsDiscount
      ? basketProductsTotalCost - nonPromoBasketProductsDiscount
      : basketProductsTotalCost;

  const orderedProductsIds =
    currentBasketProducts && getOrderedProductsIds(currentBasketProducts);

  const handleRemoveProductModalOpen = (id: number | null) => {
    setDeleteProductModalData({ isModalOpen: true, openedCameraId: id });
  };

  const handleRemoveProductModalClose = useCallback(() => {
    setDeleteProductModalData({ isModalOpen: false, openedCameraId: null });
  },[setDeleteProductModalData]);

  const handleIncreaseClick = useCallback(
    (product: ProductInfo) => {
      if (cart) {
        const newCart = cart.map((cartItem) => ({ ...cartItem }));
        const productInCart = newCart.find(
          (item) => product.name === item.name
        );
        if (productInCart && productInCart.quantity) {
          productInCart.quantity++;
          setCart(newCart);
        }
      }
    },
    [cart, setCart]
  );

  const handleDecreaseClick = useCallback(
    (product: ProductInfo) => {
      if (cart) {
        const newCart = cart.map((cartItem) => ({ ...cartItem }));
        const productInCart = newCart.find(
          (item) => product.name === item.name
        );
        if (productInCart && productInCart.quantity) {
          productInCart.quantity--;
          setCart(newCart);
        }
      }
    },
    [cart, setCart]
  );

  const handleProductQuantityChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>, product: ProductInfo) => {
      if (
        evt.target.value !== undefined &&
        evt.target.value.length > 0 &&
        cart
      ) {
        if (Number(evt.target.value) < BASKET_PRODUCTS_MIN_COUNT) {
          evt.target.value = BASKET_PRODUCTS_MIN_COUNT.toString();
        }
        if (Number(evt.target.value) > BASKET_PRODUCTS_MAX_COUNT) {
          evt.target.value = BASKET_PRODUCTS_MAX_COUNT.toString();
        }

        const newCart = cart.map((cartItem) => ({ ...cartItem }));
        const productInCart = newCart.find((item) => product.id === item.id);
        if (productInCart) {
          productInCart.quantity = Number(evt.target.value);
          setCart(newCart);
        }
      }
    },
    [cart, setCart]
  );

  const handleRemoveFromCartClick = useCallback(
    (productToRemove: ProductInfo) => {
      if (cart) {
        let newCart = cart.map((cartItem) => ({ ...cartItem }));
        newCart = newCart.filter(
          (product) => product.id !== productToRemove.id
        );
        setCart(newCart);
        handleRemoveProductModalClose();
      }
    },
    [cart, setCart, handleRemoveProductModalClose]
  );

  useEffect(() => {
    const currentCartProducts = getStoredValue<ProductInfo[]>('cart', []);
    if (currentCartProducts) {
      const currentCartProductsAmount =
        getBasketProdutsAmount(currentCartProducts);
      dispatch(changeCartProductsAmount(currentCartProductsAmount));
    } else {
      dispatch(changeCartProductsAmount(undefined));
    }
  }, [
    dispatch,
    handleRemoveFromCartClick,
    handleIncreaseClick,
    handleDecreaseClick,
    handleProductQuantityChange,
  ]);

  const handleSuccessModalOpen = () => {
    setIsOrderSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsOrderSuccessModalOpen(false);
  };

  const handleOrderSubmitButtonClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();

    dispatch(
      postOrderAction({ camerasIds: orderedProductsIds, coupon: null })
    ).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        localStorage.removeItem('cart');
        dispatch(changeCartProductsAmount(undefined));
        handleSuccessModalOpen();
      }
    });
  };

  return (
    <main>
      <Helmet>
        <title>Корзина - Фотошоп</title>
      </Helmet>
      <div className="page-content">
        <Breadcrumbs isBasket />
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            {currentBasketProducts && currentBasketProducts.length > 0 ? (
              <ul className="basket__list">
                {currentBasketProducts.map((product) => (
                  <li className="basket-item" key={product.id}>
                    <BasketProductCard
                      openedCameraInfo={product}
                      onRemoveProductModalOpen={handleRemoveProductModalOpen}
                      onIncreaseClick={handleIncreaseClick}
                      onDecreaseClick={handleDecreaseClick}
                      onProductQuantityChange={handleProductQuantityChange}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <ErrorMessage message={ErrorText.BasketError} />
            )}
            <BasketSummary
              finalCost={finalCost}
              discount={nonPromoBasketProductsDiscount}
              totalCost={basketProductsTotalCost}
              isOrderButtonDisabled={isOrderButtonDisabled}
              onOrderSubmitButtonClick={handleOrderSubmitButtonClick}
            />
          </div>
        </section>
      </div>
      {removeProductModalData.isModalOpen && (
        <RemoveProductModal
          onRemoveProductModalClose={handleRemoveProductModalClose}
          modalData={removeProductModalData}
          onRemoveFromCartClick={handleRemoveFromCartClick}
        />
      )}
      {isOrderSuccessModalOpen && (
        <OrderSuccessModal
          isSuccessModalOpen={isOrderSuccessModalOpen}
          onSuccessModalClose={handleSuccessModalClose}
        />
      )}
      <Preloader />
    </main>
  );
}

export default BasketPage;
