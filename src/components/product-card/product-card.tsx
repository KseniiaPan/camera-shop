import { Link } from 'react-router-dom';
import ProductRating from '../product-rating/product-rating';
import { ProductInfo } from '../../types/product-types';
import { AppRoute, RatingOption } from '../../consts';
import { getFormattedPrice } from '../../utils/common';

type ProductCardProps = {
  card: ProductInfo;
  onModalOpenClick: (id: number | null) => void;
  isActive: boolean | undefined;
};

function ProductCard({card, onModalOpenClick, isActive}: ProductCardProps): JSX.Element {
  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, reviewCount, id} = card;
  const formattedPrice = getFormattedPrice(price);

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
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => onModalOpenClick && onModalOpenClick(id)}
        >
          Купить
        </button>
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
