import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderSuccessModal from './order-success-modal';
import { AppRoute } from '../../consts';

describe('Component: OrderSuccessModal', () => {
  it('should render correctly', () => {
    const expectedText = /Спасибо за покупку/i;
    const mockHandleSuccessModalClose = vi.fn();

    render(
      <MemoryRouter initialEntries={[AppRoute.Cart]}> <OrderSuccessModal onSuccessModalClose={mockHandleSuccessModalClose} isSuccessModalOpen/> </MemoryRouter>
    );
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should close when close button is clicked', () => {
    const mockHandleSuccessModalClose = vi.fn();
    const expectedCloseButtonLabelText = 'Закрыть попап';

    render(
      <MemoryRouter initialEntries={[AppRoute.Cart]}> <OrderSuccessModal onSuccessModalClose={mockHandleSuccessModalClose} isSuccessModalOpen/> </MemoryRouter>
    );

    const modalCloseButton = screen.getByLabelText(expectedCloseButtonLabelText);

    fireEvent.click(modalCloseButton);

    expect(modalCloseButton).toBeInTheDocument();
    expect(mockHandleSuccessModalClose).toBeCalled();
  });
});
