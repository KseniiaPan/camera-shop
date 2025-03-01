import ProductCardRating from '../../components/product-card-rating/product-card-rating';
import {ProductPreviewCard} from '../../types/product';

type ProductCardProps = {
  card: ProductPreviewCard;
}

function ProductCard({card}: ProductCardProps): JSX.Element {
  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, reviewCount} = card;
  const formattedPrice = price.toLocaleString('ru-RU');

  return (
    <div className="product-card">
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
        <ProductCardRating rating={rating} reviewCount={reviewCount}/>
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formattedPrice} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
        >
Купить
        </button>
        <a className="btn btn--transparent" href="#">
Подробнее
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
