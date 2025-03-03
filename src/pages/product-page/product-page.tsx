import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import ReviewsList from '../../components/reviews-list/reviews-list';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProductCardRating from '../../components/product-card-rating/product-card-rating';
import ProductTabs from '../../components/product-tabs/product-tabs';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {fetchDetailedProductAction} from '../../store/api-actions';
import {getDetailedProductData, getDetailedProductLoadingStatus} from '../../store/product-process/selectors';

function ProductPage(): JSX.Element {

  const isDetailedProductLoading = useAppSelector(getDetailedProductLoadingStatus);
  const currentDetailedProduct = useAppSelector(getDetailedProductData);

  const params = useParams();
  const detailedProductId = params.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (detailedProductId) {
      dispatch(fetchDetailedProductAction(detailedProductId));
    }
  }, [detailedProductId, dispatch]);

  if (isDetailedProductLoading) {
    return (
      <LoadingPage />
    );
  }
  if (!isDetailedProductLoading && currentDetailedProduct) {
    const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, reviewCount} = currentDetailedProduct;
    const formattedPrice = price.toLocaleString('ru-RU');
    return (
      <>
        <main>
          <Helmet>
            <title>Продукт - Фотошоп</title>
          </Helmet>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="index.html">
                Главная
                      <svg width={5} height={8} aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini" />
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="catalog.html">
                Каталог
                      <svg width={5} height={8} aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini" />
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <span className="breadcrumbs__link breadcrumbs__link--active">
                      {name}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
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
                    <ProductCardRating rating={rating} reviewCount={reviewCount}/>
                    <p className="product__price">
                      <span className="visually-hidden">Цена:</span>{formattedPrice}
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
  return (<NotFoundPage />);
}

export default ProductPage;
