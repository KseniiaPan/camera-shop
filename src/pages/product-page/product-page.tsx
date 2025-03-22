import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReviewsList from '../../components/reviews-list/reviews-list';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProductRating from '../../components/product-rating/product-rating';
import ProductTabs from '../../components/product-tabs/product-tabs';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ScrollUpButton from '../../components/scroll-up-button/scroll-up-button';
import ErrorMessage from '../../components/errorMessage/error-message';
import ProductCardsSimilar from '../../components/product-cards-similar/product-cards-similar';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { RatingOption } from '../../consts';
import { ProductModalData } from '../../types/product-types';
import Modal from '../../components/modal/modal';

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

const initialState: ProductModalData = {
  isModalOpen: false,
  openedCameraId: null,
};

function ProductPage(): JSX.Element {
  const [modalData, setModalData] = useState(initialState);

  const isDetailedProductLoading = useAppSelector(
    getCurrentProductLoadingStatus
  );
  const isDataLoadingError = useAppSelector(getDataLoadingErrorStatus);
  const currentProduct = useAppSelector(getCurrentProductData);
  const similarProducts = useAppSelector(getSimilarProductsData);
  const params = useParams();
  const currentProductId = Number(params.id);
  const dispatch = useAppDispatch();

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

  const handleModalOpenClick = (id: number | null) => {
    setModalData({ isModalOpen: true, openedCameraId: id });
  };

  const handleModalClose = () => {
    setModalData({ ...modalData, isModalOpen: false });
  };

  const handleScrollUpButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isDetailedProductLoading) {
    return <LoadingPage />;
  }

  if (isDataLoadingError) {
    return <ErrorMessage />;
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
    } = currentProduct;
    const formattedPrice = price.toLocaleString('ru-RU');
    return (
      <>
        <main>
          <Helmet>
            <title>Продукт - Фотошоп</title>
          </Helmet>
          <div className="page-content">
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
                      {formattedPrice}
                    </p>
                    <button className="btn btn--purple" type="button">
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
              onModalOpenClick={handleModalOpenClick}
            />
            <div className="page-content__section">
              <ReviewsList />
            </div>
          </div>
          {modalData.isModalOpen && (
            <Modal onModalClose={handleModalClose} modalData={modalData} />
          )}
        </main>
        <ScrollUpButton onScrollUpButtonClick={handleScrollUpButtonClick} />
      </>
    );
  }
  return <NotFoundPage />;
}

export default ProductPage;
