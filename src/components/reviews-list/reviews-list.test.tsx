import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import ReviewsList from './reviews-list';
import { mockStore } from '../../utils/mocks';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ReviewsList />, mockStore);

    render(withStoreComponent);
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('btn btn--purple');
  });
});
