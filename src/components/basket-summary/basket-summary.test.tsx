import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import BasketSummary from './basket-summary';
import { mockStore } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';

describe('Component: BasketSummary', () => {
  it('should render correctly', () => {
    const basketSummaryTestId = 'basket-summary';
    const mockFinalCost = datatype.number();
    const mockDiscount = datatype.number();
    const mockTotalCost = datatype.number();
    const mockUserCoupon = datatype.string();
    const mockHandleOrderSubmitButtonClick = vi.fn();
    const mockHandleCouponChange = vi.fn();
    const mockHandleApplyCouponButtonClick = vi.fn();

    const { withStoreComponent } = withStore(
      <BasketSummary finalCost={mockFinalCost} discount={mockDiscount} totalCost={mockTotalCost} userCoupon={mockUserCoupon} isOrderButtonDisabled={false} onOrderSubmitButtonClick={mockHandleOrderSubmitButtonClick} onCouponChange={mockHandleCouponChange} onApplyCouponButtonClick={mockHandleApplyCouponButtonClick}/>,
      mockStore
    );

    render(
      withStoreComponent
    );
    expect(screen.getByTestId(basketSummaryTestId)).toBeInTheDocument();
  });
});
