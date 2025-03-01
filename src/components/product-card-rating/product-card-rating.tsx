import {RATING_STARS} from '../../consts';

type ProductCardRatingProps = {
  rating: number;
  reviewCount: number;
}

function ProductCardRating({rating, reviewCount}: ProductCardRatingProps): JSX.Element {

  return (
    <div className="rate product-card__rate">
      {
        RATING_STARS.map((starValue) => (
          <svg key={starValue}
            width={17}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref={starValue <= rating ? '#icon-full-star' : '#icon-star'}/>
          </svg>
        ))
      }
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>{reviewCount}
      </p>
    </div>
  );
}

export default ProductCardRating;
