import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { MemoryRouter } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import ProductPage from './product-page';
import { AppRoute } from '../../consts';
import { mockStore } from '../../utils/mocks';

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    const productPageTestId = 'prouct-page';

    const { withStoreComponent } = withStore(
      <ProductPage/>,
      mockStore
    );

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[AppRoute.Main, AppRoute.Product]}>
          {withStoreComponent}
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByTestId(productPageTestId)).toBeInTheDocument();
  });
});
