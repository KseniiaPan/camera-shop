import { render, screen } from '@testing-library/react';
import BasketPromo from './basket-promo';
import { mockStore } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';

describe('Component: BasketPromo', () => {
  it('should render correctly', () => {
    const basketPromoTestId = 'basket-promo';
    const mockCoupon = 'camera-333';
    const mockHandleCouponChange = vi.fn();
    const mockHandleApplyCouponButtonClick = vi.fn();

    const { withStoreComponent } = withStore(
      <BasketPromo userCoupon={mockCoupon} onCouponChange={mockHandleCouponChange} onApplyCouponButtonClick={mockHandleApplyCouponButtonClick}/>,
      mockStore
    );

    render(
      withStoreComponent
    );
    expect(screen.getByTestId(basketPromoTestId)).toBeInTheDocument();
  });
});
