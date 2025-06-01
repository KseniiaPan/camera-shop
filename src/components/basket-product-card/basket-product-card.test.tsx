import { render, screen } from '@testing-library/react';
import BasketProductCard from './basket-product-card';
import { mockProduct, mockStore } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';

describe('Component: BasketProductCard', () => {
  it('should render correctly', () => {
    const basketProductCardTestId = 'basket-product-card';
    const mockHandleRemoveProductModalOpen = vi.fn();
    const mockHandleIncreaseClick = vi.fn();
    const mockHandleDecreaseClick = vi.fn();
    const mockHandleProductQuantityChange = vi.fn();

    const { withStoreComponent } = withStore(
      <BasketProductCard onRemoveProductModalOpen={mockHandleRemoveProductModalOpen} onIncreaseClick={mockHandleIncreaseClick} onDecreaseClick={mockHandleDecreaseClick} onProductQuantityChange={mockHandleProductQuantityChange} openedCameraInfo={mockProduct}/>,
      mockStore
    );

    render(
      withStoreComponent
    );
    expect(screen.getByTestId(basketProductCardTestId)).toBeInTheDocument();
  });
});
