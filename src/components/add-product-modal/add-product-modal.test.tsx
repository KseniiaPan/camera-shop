import { render, screen, fireEvent } from '@testing-library/react';
import AddProductModal from './add-product-modal';
import { mockProductModalData, mockStore } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';

describe('Component: AddProductModal', () => {
  it('should render correctly', () => {
    const expectedText = /Добавить товар в корзину/i;
    const mockHandleAddProductModalClose = vi.fn();
    const mockHandleAddToCartClick = vi.fn();

    const { withStoreComponent } = withStore(
      <AddProductModal onAddProductModalClose={mockHandleAddProductModalClose} onAddToCartClick={mockHandleAddToCartClick} modalData={mockProductModalData}/>,
      mockStore
    );

    render(
      withStoreComponent
    );
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should close when close button is clicked', () => {
    const mockHandleAddProductModalClose = vi.fn();
    const mockHandleAddToCartClick = vi.fn();
    const expectedCloseButtonLabelText = 'Закрыть попап';

    const { withStoreComponent } = withStore(
      <AddProductModal onAddProductModalClose={mockHandleAddProductModalClose} onAddToCartClick={mockHandleAddToCartClick} modalData={mockProductModalData}/>,
      mockStore
    );

    render(
      withStoreComponent
    );

    const modalCloseButton = screen.getByLabelText(expectedCloseButtonLabelText);

    fireEvent.click(modalCloseButton);

    expect(modalCloseButton).toBeInTheDocument();
    expect(mockHandleAddProductModalClose).toBeCalled();

  });
});
