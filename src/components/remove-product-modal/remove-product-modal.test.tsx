import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockProductModalData } from '../../utils/mocks';
import RemoveProductModal from './remove-product-modal';
import { AppRoute } from '../../consts';

describe('Component: RemoveProductModal', () => {
  it('should render correctly', () => {
    const expectedText = /Удалить этот товар?/i;
    const mockHandleRemoveProductModalClose = vi.fn();
    const mockHandleRemoveFromCartClick = vi.fn();

    render(
      <MemoryRouter initialEntries={[AppRoute.Cart]}> <RemoveProductModal onRemoveProductModalClose={mockHandleRemoveProductModalClose} modalData={mockProductModalData} onRemoveFromCartClick={mockHandleRemoveFromCartClick}/> </MemoryRouter>
    );
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should close when close button is clicked', () => {
    const mockHandleRemoveProductModalClose = vi.fn();
    const mockHandleRemoveFromCartClick = vi.fn();
    const expectedCloseButtonLabelText = 'Закрыть попап';

    render(
      <MemoryRouter initialEntries={[AppRoute.Cart]}> <RemoveProductModal onRemoveProductModalClose={mockHandleRemoveProductModalClose} modalData={mockProductModalData} onRemoveFromCartClick={mockHandleRemoveFromCartClick}/> </MemoryRouter>
    );

    const modalCloseButton = screen.getByLabelText(expectedCloseButtonLabelText);

    fireEvent.click(modalCloseButton);

    expect(modalCloseButton).toBeInTheDocument();
    expect(mockHandleRemoveProductModalClose).toBeCalled();
  });
});
