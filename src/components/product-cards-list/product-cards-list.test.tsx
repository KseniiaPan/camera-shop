import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { MemoryRouter } from 'react-router-dom';
import ProductCardsList from './product-cards-list';
import { AppRoute } from '../../consts';
import { mockStore } from '../../utils/mocks';

describe('Component: ProductCardsList', () => {
  it('should render correctly', () => {
    const productCardsListTestId = 'product-cards-list';
    const mockHandleModalOpenClick = vi.fn();

    const { withStoreComponent } = withStore(
      <ProductCardsList onModalOpenClick={mockHandleModalOpenClick} />,
      mockStore
    );

    render(
      <MemoryRouter initialEntries={[AppRoute.Main]}>
        {withStoreComponent}
      </MemoryRouter>
    );

    expect(screen.getByTestId(productCardsListTestId)).toBeInTheDocument();
  });
});
