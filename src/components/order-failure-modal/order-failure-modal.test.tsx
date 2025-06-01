import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderFailureModal from './order-failure-modal';
import { AppRoute } from '../../consts';

describe('Component: OrderFailureModal', () => {
  it('should render correctly', () => {
    const expectedText = /Не удалось оформить заказ/i;
    const mockHandleFailureModalClose = vi.fn();

    render(
      <MemoryRouter initialEntries={[AppRoute.Cart]}> <OrderFailureModal onFailureModalClose={mockHandleFailureModalClose} isFailureModalOpen/> </MemoryRouter>
    );
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should close when close button is clicked', () => {
    const mockHandleFailureModalClose = vi.fn();
    const expectedCloseButtonLabelText = 'Закрыть попап';

    render(
      <MemoryRouter initialEntries={[AppRoute.Cart]}> <OrderFailureModal onFailureModalClose={mockHandleFailureModalClose} isFailureModalOpen/> </MemoryRouter>
    );

    const modalCloseButton = screen.getByLabelText(expectedCloseButtonLabelText);

    fireEvent.click(modalCloseButton);

    expect(modalCloseButton).toBeInTheDocument();
    expect(mockHandleFailureModalClose).toBeCalled();
  });
});
