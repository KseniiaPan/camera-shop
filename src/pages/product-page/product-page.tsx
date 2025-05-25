import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import ReviewsList from '../../components/reviews-list/reviews-list';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProductRating from '../../components/product-rating/product-rating';
import ProductTabs from '../../components/product-tabs/product-tabs';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ScrollUpButton from '../../components/scroll-up-button/scroll-up-button';
import ErrorMessage from '../../components/errorMessage/error-message';
import ProductCardsSimilar from '../../components/product-cards-similar/product-cards-similar';
import AddProductModal from '../../components/add-product-modal/add-product-modal';
import AddProductSuccessModal from '../../components/add-product-success-modal/add-product-success-modal';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { RatingOption, ErrorText } from '../../consts';
import { ProductModalData, ProductInfo } from '../../types/product-types';
import {
  fetchCurrentProductAction,
  fetchReviewsAction,
  fetchSimilarProductsAction,
} from '../../store/api-actions';
import {
  getCurrentProductData,
  getCurrentProductLoadingStatus,
  getDataLoadingErrorStatus,
  getSimilarProductsData,
} from '../../store/product-process/selectors';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { getStoredValue } from '../../utils/common';
import { getBasketProdutsAmount } from '../../utils/basket-calculation';
import { changeCartProductsAmount } from '../../store/order-process/order-process';

const initialAddProductModalState: ProductModalData = {
  isModalOpen: false,
  openedCameraId: null,
};

function ProductPage(): JSX.Element {
  const [addProductModalData, setAddProductModalData] = useState(
    initialAddProductModalState
  );
  const [isProductSuccessModalOpen, setIsProductSuccessModalOpen] =
    useState(false);
  const [cart, setCart] = useLocalStorage<ProductInfo[]>('cart', []);
  const dispatch = useAppDispatch();
  const isDetailedProductLoading = useAppSelector(
    getCurrentProductLoadingStatus
  );
  const isDataLoadingError = useAppSelector(getDataLoadingErrorStatus);
  const currentProduct = useAppSelector(getCurrentProductData);
  const similarProducts = useAppSelector(getSimilarProductsData);
  const params = useParams();

  const currentProductId = Number(params.id);

  useEffect(() => {
    if (currentProductId) {
      dispatch(fetchCurrentProductAction(currentProductId)).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchReviewsAction(currentProductId));
          dispatch(fetchSimilarProductsAction(currentProductId));
        }
      });
    }
  }, [currentProductId, dispatch]);

  const handleAddProductModalOpenClick = (id: number | null) => {
    setAddProductModalData({ isModalOpen: true, openedCameraId: id });
  };

  const handleAddProductModalCloseClick = () => {
    setAddProductModalData({ isModalOpen: false, openedCameraId: null });
  };

  const handleSuccessModalOpen = () => {
    setIsProductSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsProductSuccessModalOpen(false);
  };
  const handleScrollUpButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleAddToCartClick = useCallback(
    (product: ProductInfo) => {
      const newCart = cart ? cart.map((cartItem) => ({ ...cartItem })) : [];
      let productInCart = newCart.find((item) => product.name === item.name);
      if (productInCart && productInCart.quantity) {
        productInCart.quantity++;
      } else {
        productInCart = {
          ...product,
          quantity: 1,
        };
        newCart.push(productInCart);
      }
      setCart(newCart);
      handleSuccessModalOpen();
      handleAddProductModalCloseClick();
    },
    [cart, setCart]
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
  }, [dispatch, handleAddToCartClick]);

  if (isDetailedProductLoading) {
    return <LoadingPage />;
  }

  if (isDataLoadingError) {
    return <ErrorMessage message={ErrorText.ServerError} />;
  }

  if (!isDetailedProductLoading && currentProduct) {
    const {
      previewImgWebp,
      previewImgWebp2x,
      previewImg,
      previewImg2x,
      name,
      rating,
      price,
      reviewCount,
      id,
    } = currentProduct;
    const formattedPrice = price.toLocaleString('ru-RU');

    return (
      <>
        <main>
          <Helmet>
            <title>Продукт - Фотошоп</title>
          </Helmet>
          <div className="page-content" data-testid="prouct-page">
            <Breadcrumbs cameraName={name} />
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}
                      />
                      <img
                        src={`../${previewImg}`}
                        srcSet={`../${previewImg2x} 2x`}
                        width={560}
                        height={480}
                        alt={name}
                      />
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{name}</h1>
                    <ProductRating
                      rating={rating}
                      reviewCount={reviewCount}
                      ratingOption={RatingOption.Product}
                    />
                    <p className="product__price">
                      <span className="visually-hidden">Цена:</span>
                      {formattedPrice} ₽
                    </p>
                    <button
                      className="btn btn--purple"
                      type="button"
                      onClick={() => handleAddProductModalOpenClick(id)}
                    >
                      <svg width={24} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-add-basket" />
                      </svg>
                      Добавить в корзину
                    </button>
                    <ProductTabs />
                  </div>
                </div>
              </section>
            </div>
            <ProductCardsSimilar
              similarProducts={similarProducts}
              onModalOpenClick={handleAddProductModalOpenClick}
            />
            <div className="page-content__section">
              <ReviewsList />
            </div>
          </div>
          {addProductModalData.isModalOpen && (
            <AddProductModal
              onAddProductModalClose={handleAddProductModalCloseClick}
              modalData={addProductModalData}
              onAddToCartClick={handleAddToCartClick}
            />
          )}
          {isProductSuccessModalOpen && (
            <AddProductSuccessModal
              onSuccessModalClose={handleSuccessModalClose}
              isSuccessModalOpen={isProductSuccessModalOpen}
            />
          )}
        </main>
        <ScrollUpButton onScrollUpButtonClick={handleScrollUpButtonClick} />
      </>
    );
  }
  return <NotFoundPage />;
}

export default ProductPage;
