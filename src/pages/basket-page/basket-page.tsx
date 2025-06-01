import { Helmet } from 'react-helmet-async';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import BasketProductCard from '../../components/basket-product-card/basket-product-card';
import RemoveProductModal from '../../components/remove-product-modal/remove-product-modal';
import OrderSuccessModal from '../../components/order-success-modal/order-success-modal';
import OrderFailureModal from '../../components/order-failure-modal/order-failure-modal';
import ErrorMessage from '../../components/errorMessage/error-message';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Preloader from '../../components/preloader/preloader';
import { ProductInfo, ProductModalData } from '../../types/product-types';
import {
  ErrorText,
  BASKET_PRODUCTS_MIN_COUNT,
  BASKET_PRODUCTS_MAX_COUNT,
  LoadingStatus,
  ValidityStatus
} from '../../consts';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { getStoredValue } from '../../utils/common';
import { changeCartProductsAmount } from '../../store/order-process/order-process';
import { postOrderAction, postCouponAction } from '../../store/api-actions';
import { getPromoProductsData } from '../../store/promo-process/selectors';
import { getOrderPostingStatus } from '../../store/order-process/selectors';
import { getCouponDiscount, getCouponValidityStatus, getCouponPostingStatus } from '../../store/order-process/selectors';
import {
  getBasketProdutsAmount,
  getNonPromoBasketProducts,
  getSummedPrice,
  getProductsQuantity,
  getDiscountForQuantity,
  getReducedDiscount,
  getOrderedProductsIds,
  getTotalDiscount
} from '../../utils/basket-calculation';

const initialRemoveProductModalState: ProductModalData = {
  isModalOpen: false,
  openedCameraId: null,
};

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [removeProductModalData, setDeleteProductModalData] = useState(
    initialRemoveProductModalState
  );
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);
  const [isOrderFailureModalOpen, setIsOrderFailureModalOpen] = useState(false);
  const [userCoupon, setUserCoupon] = useState<string | null>(null);

  const [cart, setCart] = useLocalStorage<ProductInfo[]>('cart', []);
  const [appliedCouponDiscount, setAppliedCouponDiscount] = useLocalStorage<number | undefined>('couponDiscount', undefined);
  const [appliedCoupon, setAppliedCoupon] = useLocalStorage<string | null>('coupon', null);
  const [couponValidity, setCouponValidity] = useLocalStorage<ValidityStatus | undefined>('couponValidity', undefined);

  const currentPromoProducts = useAppSelector(getPromoProductsData);
  const currentCouponDiscount = useAppSelector(getCouponDiscount);
  const isOrderPosting = useAppSelector(getOrderPostingStatus);
  const isCouponPosting = useAppSelector(getCouponPostingStatus);
  const currentCouponValidityStatus = useAppSelector(getCouponValidityStatus);

  const currentBasketProducts = getStoredValue<ProductInfo[]>('cart', []);
  const currentAppliedCouponDiscount = getStoredValue<number | undefined>('couponDiscount', undefined);
  const basketProductsTotalCost = currentBasketProducts && getSummedPrice(currentBasketProducts);

  const resetCoupon = useCallback(() => {
    localStorage.removeItem('couponDiscount');
    localStorage.removeItem('coupon');
    localStorage.removeItem('couponValidity');
  }, []);

  useEffect(() => {
    if (!currentBasketProducts || currentBasketProducts.length === 0) {
      resetCoupon();
      setUserCoupon(null);
    }
  }, [currentBasketProducts, resetCoupon]);


  useEffect(() => {
    if (appliedCoupon && currentCouponValidityStatus === ValidityStatus.Valid) {
      setAppliedCouponDiscount(currentCouponDiscount);
      setCouponValidity(ValidityStatus.Valid);
    }
  }, [appliedCoupon, appliedCouponDiscount, setAppliedCouponDiscount, setCouponValidity, currentCouponDiscount, currentCouponValidityStatus]);

  useEffect(() => {
    if (!userCoupon && couponValidity === ValidityStatus.Invalid) {
      resetCoupon();
    }
  }, [resetCoupon, userCoupon, couponValidity]);


  const isOrderButtonDisabled =
    !currentBasketProducts ||
    currentBasketProducts.length === 0 ||
    isOrderPosting || isCouponPosting;

  const nonPromoBasketProducts =
    currentBasketProducts &&
    currentPromoProducts &&
    getNonPromoBasketProducts(currentBasketProducts, currentPromoProducts);

  const nonPromoBasketProductsTotalCost =
    nonPromoBasketProducts && getSummedPrice(nonPromoBasketProducts);

  const nonPromoBasketProductsQuantity =
    nonPromoBasketProducts && getProductsQuantity(nonPromoBasketProducts);

  const discountForQuantity =
    nonPromoBasketProductsQuantity &&
    getDiscountForQuantity(nonPromoBasketProductsQuantity);

  const reducedDiscountForQuantity =
    discountForQuantity &&
    nonPromoBasketProductsTotalCost &&
    getReducedDiscount(discountForQuantity, nonPromoBasketProductsTotalCost);

  const nonPromoQuantityDiscountAmount =
    nonPromoBasketProductsTotalCost &&
    reducedDiscountForQuantity &&
    nonPromoBasketProductsTotalCost * (reducedDiscountForQuantity / 100);

  const produtsCouponDiscountAmount = basketProductsTotalCost && currentAppliedCouponDiscount && basketProductsTotalCost * (currentAppliedCouponDiscount / 100);

  const totalDisount = getTotalDiscount(nonPromoQuantityDiscountAmount, produtsCouponDiscountAmount);

  const finalCost =
    basketProductsTotalCost && totalDisount
      ? basketProductsTotalCost - totalDisount
      : basketProductsTotalCost;

  const orderedProductsIds = currentBasketProducts && getOrderedProductsIds(currentBasketProducts);

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

  const handleFailureModalOpen = () => {
    setIsOrderFailureModalOpen(true);
  };

  const handleFailureModalClose = () => {
    setIsOrderFailureModalOpen(false);
  };

  const handleCouponChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (
      evt.target.value !== undefined
    ) {
      resetCoupon();
      setUserCoupon(evt.target.value.trim());
    }
  };

  const handleApplyButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (userCoupon) {
      dispatch(postCouponAction({coupon: userCoupon})).then((response) => {
        if (response.meta.requestStatus === LoadingStatus.Fulfilled) {
          setAppliedCoupon(userCoupon);

        } else
        if (response.meta.requestStatus === LoadingStatus.Rejected) {
          setAppliedCoupon(null);
        }
      });
    }
  };

  const handleOrderSubmitButtonClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    dispatch(
      postOrderAction({ camerasIds: orderedProductsIds, coupon: appliedCoupon ? appliedCoupon : null})
    ).then((response) => {
      if (response.meta.requestStatus === LoadingStatus.Fulfilled) {
        localStorage.removeItem('cart');
        resetCoupon();
        setUserCoupon(null);
        dispatch(changeCartProductsAmount(undefined));
        handleSuccessModalOpen();
      } else if (response.meta.requestStatus === LoadingStatus.Rejected) {
        handleFailureModalOpen();
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
              discount={totalDisount}
              totalCost={basketProductsTotalCost}
              userCoupon={userCoupon}
              isOrderButtonDisabled={isOrderButtonDisabled}
              onOrderSubmitButtonClick={handleOrderSubmitButtonClick}
              onCouponChange={handleCouponChange}
              onApplyCouponButtonClick={handleApplyButtonClick}
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
      {isOrderFailureModalOpen && (
        <OrderFailureModal
          isFailureModalOpen={isOrderFailureModalOpen}
          onFailureModalClose={handleFailureModalClose}
        />
      )}
      <Preloader />
    </main>
  );
}

export default BasketPage;
