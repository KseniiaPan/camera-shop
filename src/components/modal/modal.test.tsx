import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './modal';
import { mockProductModalData, mockStore } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';

describe('Component: Modal', () => {
  it('should render correctly', () => {
    const expectedText = /Свяжитесь со мной/i;
    const mockHandleModalClose = vi.fn();

    const { withStoreComponent } = withStore(
      <Modal onModalClose={mockHandleModalClose} modalData={mockProductModalData}/>,
      mockStore
    );

    render(
      withStoreComponent
    );
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should close when close button is clicked', () => {
    const mockHandleModalClose = vi.fn();
    const expectedCloseButtonLabelText = 'Закрыть попап';

    const { withStoreComponent } = withStore(
      <Modal onModalClose={mockHandleModalClose} modalData={mockProductModalData}/>,
      mockStore
    );

    render(
      withStoreComponent
    );

    const modalCloseButton = screen.getByLabelText(expectedCloseButtonLabelText);

    fireEvent.click(modalCloseButton);

    expect(modalCloseButton).toBeInTheDocument();
    expect(mockHandleModalClose).toBeCalled();

  });
});
