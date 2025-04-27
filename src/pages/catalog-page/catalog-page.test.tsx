import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import CatalogPage from './catalog-page';
import { AppRoute } from '../../consts';
import { mockStore } from '../../utils/mocks';

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    const expectedText = /Каталог фото- и видеотехники/i;

    const { withStoreComponent } = withStore(
      <CatalogPage />,
      mockStore
    );

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[AppRoute.Main]}>
          {withStoreComponent}
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
