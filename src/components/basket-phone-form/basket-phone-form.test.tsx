import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../utils/mock-component';
import BasketPhoneForm from './basket-phone-form';

describe('Component: BasketPhoneForm', () => {
  it('should render correctly', () => {
    const phonePlaceholderText = 'Введите ваш номер';
    const mockHandleModalClose = vi.fn();
    const mockOpenedCameraId = 1;

    const { withStoreComponent } = withStore(<BasketPhoneForm onModalClose={mockHandleModalClose} openedCameraId={mockOpenedCameraId}/>, {});
    render(withStoreComponent);

    expect(screen.getByPlaceholderText(phonePlaceholderText)).toBeInTheDocument();
  });

  it('should render correctly when user enters phone number', async () => {
    const phoneElementTestId = 'phoneElement';
    const expectedPhoneValue = '+78000000000';
    const mockHandleModalClose = vi.fn();
    const mockOpenedCameraId = 1;
    const { withStoreComponent } = withStore(<BasketPhoneForm onModalClose={mockHandleModalClose} openedCameraId={mockOpenedCameraId} />, {});

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId(phoneElementTestId),
      expectedPhoneValue,
    );

    expect(screen.getByDisplayValue(expectedPhoneValue)).toBeInTheDocument();
  });

  it('should enable submit button when user enters phone number in correct format', async () => {
    const phoneElementTestId = 'phoneElement';
    const expectedPhoneValue = '+78000000000';
    const mockHandleModalClose = vi.fn();
    const mockOpenedCameraId = 1;
    const { withStoreComponent } = withStore(<BasketPhoneForm onModalClose={mockHandleModalClose} openedCameraId={mockOpenedCameraId} />, {});

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId(phoneElementTestId),
      expectedPhoneValue,
    );

    expect(screen.getByDisplayValue(expectedPhoneValue)).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should disable submit button when user enters phone number in incorrect format', async () => {
    const phoneElementTestId = 'phoneElement';
    const expectedPhoneValue = '8000000';
    const mockHandleModalClose = vi.fn();
    const mockOpenedCameraId = 1;
    const { withStoreComponent } = withStore(<BasketPhoneForm onModalClose={mockHandleModalClose} openedCameraId={mockOpenedCameraId} />, {});

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId(phoneElementTestId),
      expectedPhoneValue,
    );

    expect(screen.getByDisplayValue(expectedPhoneValue)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

});
