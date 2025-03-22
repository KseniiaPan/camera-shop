import { render, screen } from '@testing-library/react';
import ProductRating from './product-rating';
import { mockProduct } from '../../utils/mocks';
import { RatingOption } from '../../consts';

describe('Component: ProductRating', () => {
  it('should render correctly when used on the product page', () => {
    const productRatingTestId = 'product-rating';
    render(
      <ProductRating
        rating={mockProduct.rating}
        ratingOption={RatingOption.Product}
        reviewCount={mockProduct.reviewCount}
      />
    );
    expect(screen.getByTestId(productRatingTestId)).toBeInTheDocument();
  });

  it('should render correctly when used on the catalog page', () => {
    const productRatingTestId = 'product-rating';
    render(
      <ProductRating
        rating={mockProduct.rating}
        ratingOption={RatingOption.ProductCard}
        reviewCount={mockProduct.reviewCount}
      />
    );
    expect(screen.getByTestId(productRatingTestId)).toBeInTheDocument();
  });

  it('should render correctly when used in reviews on the catalog page', () => {
    const productRatingTestId = 'product-rating';
    render(
      <ProductRating
        rating={mockProduct.rating}
        ratingOption={RatingOption.ReviewCard}
        reviewCount={mockProduct.reviewCount}
      />
    );
    expect(screen.getByTestId(productRatingTestId)).toBeInTheDocument();
  });
});
