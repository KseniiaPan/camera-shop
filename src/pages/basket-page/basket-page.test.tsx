import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import BasketPage from './basket-page';
import { AppRoute } from '../../consts';
import { mockStore } from '../../utils/mocks';

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    const basketPageTestId = 'basket-page';

    const { withStoreComponent } = withStore(
      <BasketPage/>,
      mockStore
    );

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[AppRoute.Cart]}>
          {withStoreComponent}
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByTestId(basketPageTestId)).toBeInTheDocument();
  });
});
