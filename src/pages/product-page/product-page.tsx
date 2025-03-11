import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import ReviewsList from '../../components/reviews-list/reviews-list';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProductCardRating from '../../components/product-card-rating/product-card-rating';
import ProductTabs from '../../components/product-tabs/product-tabs';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {RatingOption} from '../../consts';
import {fetchCurrentProductAction, fetchReviewsAction} from '../../store/api-actions';
import {getCurrentProductData, getCurrentProductLoadingStatus} from '../../store/product-process/selectors';

function ProductPage(): JSX.Element {
  const isDetailedProductLoading = useAppSelector(
    getCurrentProductLoadingStatus
  );
  const currentProduct = useAppSelector(getCurrentProductData);

  const params = useParams();
  const currentProductId = params.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentProductId) {
      dispatch(fetchCurrentProductAction(currentProductId)).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchReviewsAction(currentProductId));
        }
      });
    }
  }, [currentProductId, dispatch]);

  if (isDetailedProductLoading) {
    return <LoadingPage />;
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
                    <ProductCardRating
                      rating={rating}
                      reviewCount={reviewCount}
                      ratingOption={RatingOption.product}
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
            <div className="page-content__section">
              <ReviewsList />
            </div>
          </div>
        </main>
        <a className="up-btn" href="#header">
          <svg width={12} height={18} aria-hidden="true">
            <use xlinkHref="#icon-arrow2" />
          </svg>
        </a>
      </>
    );
  }
  return <NotFoundPage />;
}

export default ProductPage;
