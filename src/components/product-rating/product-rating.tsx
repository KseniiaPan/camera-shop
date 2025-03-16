import {RATING_STARS} from '../../consts';

type ProductRatingProps = {
  rating: number;
  ratingOption: string;
  reviewCount?: number;
};

function ProductRating({rating, ratingOption, reviewCount}: ProductRatingProps): JSX.Element {
  return (
    <div className={`rate ${ratingOption}__rate`}>
      {RATING_STARS.map((starValue) => (
        <svg key={starValue} width={17} height={16} aria-hidden="true">
          <use
            xlinkHref={starValue <= rating ? '#icon-full-star' : '#icon-star'}
          />
        </svg>
      ))}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      {reviewCount && (
        <p className="rate__count">
          <span className="visually-hidden">Всего оценок:</span>
          {reviewCount}
        </p>
      )}
    </div>
  );
}

export default ProductRating;
