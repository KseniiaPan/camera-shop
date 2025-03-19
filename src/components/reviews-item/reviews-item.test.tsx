import { render, screen } from '@testing-library/react';
import ReviewsItem from './reviews-item';
import { mockReviews } from '../../utils/mocks';

describe('Component: ReviewsItem', () => {
  it('should render correctly when used on the product page', () => {
    render(<ReviewsItem userReview={mockReviews[0]} />);
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
  });
});
