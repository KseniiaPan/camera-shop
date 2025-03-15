import {Review} from '../../types/review-types';
import ProductRating from '../product-rating/product-rating';
import {RatingOption} from '../../consts';
import {humanizeCommentDate, getDateWithoutTime} from '../../utils/common';

type ReviewsItemProps = {
  userReview: Review;
};

function ReviewsItem({ userReview }: ReviewsItemProps): JSX.Element {
  const { userName, createAt, rating, advantage, disadvantage, review } =
    userReview;
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time
          className="review-card__data"
          dateTime={getDateWithoutTime(createAt)}
        >
          {humanizeCommentDate(createAt)}
        </time>
      </div>
      <ProductRating
        rating={rating}
        ratingOption={RatingOption.reviewCard}
      />
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewsItem;
