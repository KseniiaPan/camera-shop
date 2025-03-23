import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { MemoryRouter } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import MainPage from './main-page';
import { AppRoute } from '../../consts';
import { mockStore } from '../../utils/mocks';

describe('Component: ProductCardsList', () => {
  it('should render correctly', () => {
    const expectedText = /Каталог фото- и видеотехники/i;

    const { withStoreComponent } = withStore(
      <MainPage/>,
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
