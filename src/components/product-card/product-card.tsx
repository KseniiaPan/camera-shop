import { Link } from 'react-router-dom';
import ProductRating from '../product-rating/product-rating';
import { ProductInfo } from '../../types/product-types';
import { AppRoute, RatingOption } from '../../consts';
import { getFormattedPrice } from '../../utils/common';
import { getStoredValue } from '../../utils/common';

type ProductCardProps = {
  card: ProductInfo;
  onModalOpenClick: (id: number | null) => void;
  isActive: boolean | undefined;
};

function ProductCard({card, onModalOpenClick, isActive}: ProductCardProps): JSX.Element {
  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, reviewCount, id} = card;
  const formattedPrice = getFormattedPrice(price);

  const currentCartProducts = getStoredValue<ProductInfo[]>('cart', []);
  const productInCart =
    currentCartProducts &&
    currentCartProducts.find((cardItem) => cardItem.id === id);
  return (
    <div
      className={`product-card ${isActive ? 'is-active' : ''}`}
      data-testid="product-card"
    >
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <ProductRating
          rating={rating}
          reviewCount={reviewCount}
          ratingOption={RatingOption.ProductCard}
        />
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {formattedPrice} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {productInCart ? (
          <Link
            className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
            to={AppRoute.Cart}
          >
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>
            В корзине
          </Link>
        ) : (
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={() => onModalOpenClick && onModalOpenClick(id)}
          >
            Купить
          </button>
        )}
        <Link
          className="btn btn--transparent"
          to={AppRoute.Product.replace(':id', String(id))}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
