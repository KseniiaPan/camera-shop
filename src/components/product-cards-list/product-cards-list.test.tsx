import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { MemoryRouter } from 'react-router-dom';
import ProductCardsList from './product-cards-list';
import { AppRoute, ProductsListOption } from '../../consts';
import { mockStore, mockProducts } from '../../utils/mocks';

describe('Component: ProductCardsList', () => {
  it('should render correctly when used on the catalog page', () => {
    const productCardsListTestId = 'product-cards-list';
    const mockHandleModalOpenClick = vi.fn();

    const { withStoreComponent } = withStore(
      <ProductCardsList products={mockProducts} onModalOpenClick={mockHandleModalOpenClick} productsListOption = {ProductsListOption.CatalogList} isActive={false}/>,
      mockStore
    );

    render(
      <MemoryRouter initialEntries={[AppRoute.Main]}>
        {withStoreComponent}
      </MemoryRouter>
    );

    expect(screen.getByTestId(productCardsListTestId)).toBeInTheDocument();
  });

  it('should render correctly when used on the product page in the similar products section', () => {
    const productCardsListTestId = 'product-cards-list';
    const mockHandleModalOpenClick = vi.fn();

    const { withStoreComponent } = withStore(
      <ProductCardsList products={mockProducts} onModalOpenClick={mockHandleModalOpenClick} productsListOption = {ProductsListOption.SimilarList} isActive/>,
      mockStore
    );

    render(
      <MemoryRouter initialEntries={[AppRoute.Product]}>
        {withStoreComponent}
      </MemoryRouter>
    );

    expect(screen.getByTestId(productCardsListTestId)).toBeInTheDocument();
  });
});
