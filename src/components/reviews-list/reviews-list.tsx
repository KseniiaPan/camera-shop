import {useAppSelector} from '../../hooks/index';
import {getReviewsData} from '../../store//review-process/selectos';
import ReviewsItem from '../../components/reviews-item/reviews-item';

function ReviewsList(): JSX.Element {
  const reviews = useAppSelector(getReviewsData);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
        </div>
        <ul className="review-block__list">
          {reviews.map((review) => (
            <ReviewsItem key={review.id} userReview={review} />
          ))}
        </ul>
        <div className="review-block__buttons">
          <button className="btn btn--purple" type="button">
            Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReviewsList;
