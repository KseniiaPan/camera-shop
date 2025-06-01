import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { MemoryRouter } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import App from './app';
import { AppRoute } from '../../consts';
import { mockStore } from '../../utils/mocks';

describe('Application Routing', () => {

  it('should render main page correctly', async () => {
    const expectedText = /Каталог фото- и видеотехники/i;
    const { withStoreComponent } = withStore(
      <App/>,
      mockStore
    );

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[AppRoute.Main]}>
          {withStoreComponent}
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(await screen.findByText(expectedText)).toBeInTheDocument();
  });

  it('should render product page correctly', async () => {
    const expectedText = /Характеристики/i;
    const { withStoreComponent } = withStore(
      <App/>,
      mockStore
    );

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[AppRoute.Product]}>
          {withStoreComponent}
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(await screen.findByText(expectedText)).toBeInTheDocument();
  });

  it('should render basket page correctly', async () => {
    const expectedText = /Если у вас есть промокод на скидку, примените его в этом поле/i;
    const { withStoreComponent } = withStore(
      <App/>,
      mockStore
    );

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[AppRoute.Cart]}>
          {withStoreComponent}
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(await screen.findByText(expectedText)).toBeInTheDocument();
  });

  it('should render page with 404 error correctly', async () => {
    const expectedText = /Страница не найдена/i;
    const unknownRoute = '/unknown-route';

    const { withStoreComponent } = withStore(
      <App/>,
      mockStore
    );

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[unknownRoute]}>
          {withStoreComponent}
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(await screen.findByText(expectedText)).toBeInTheDocument();
  });

});

