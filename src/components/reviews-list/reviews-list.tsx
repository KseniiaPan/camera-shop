import { useState } from 'react';
import { useAppSelector } from '../../hooks/index';
import { getReviewsData } from '../../store/review-process/selectos';
import ReviewsItem from '../../components/reviews-item/reviews-item';
import { COMMENTS_COUNT_STEP, COMMENTS_DEFAULT_COUNT } from '../../consts';

function ReviewsList(): JSX.Element {
  const [reviewsCount, setReviewsCount] = useState<number>(COMMENTS_COUNT_STEP);

  const reviews = useAppSelector(getReviewsData);
  const visibleReviews = reviews.slice(COMMENTS_DEFAULT_COUNT, reviewsCount);
  const handleReviewsLoadingButtonClick = () =>
    setReviewsCount(reviewsCount + COMMENTS_COUNT_STEP);

  const isReviewsLoadingButton = reviewsCount < reviews.length;

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
        </div>
        <ul className="review-block__list">
          {visibleReviews.map((review) => (
            <ReviewsItem key={review.id} userReview={review} />
          ))}
        </ul>
        <div className="review-block__buttons">
          {isReviewsLoadingButton && (
            <button
              className="btn btn--purple"
              type="button"
              onClick={handleReviewsLoadingButtonClick}
            >
              Показать больше отзывов
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default ReviewsList;
