import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BasketLink from './basket-link';
import { AppRoute } from '../../consts';
import { withStore } from '../../utils/mock-component';
import { mockStore } from '../../utils/mocks';

describe('Component: BasketLink', () => {
  it('should render correctly', () => {
    const expectedLabelText = 'Корзина';

    const { withStoreComponent } = withStore(
      <BasketLink />,
      mockStore
    );

    render(<MemoryRouter initialEntries={[AppRoute.Cart]}> {withStoreComponent}</MemoryRouter>);
    expect(screen.getByLabelText(expectedLabelText)).toBeInTheDocument();
  });
});

