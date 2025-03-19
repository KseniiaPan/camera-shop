import { render, screen } from '@testing-library/react';
import ProductCard from './product-card';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { mockProduct } from '../../utils/mocks';

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const mockHandleModalOpenClick = vi.fn();

    const productCardTestId = 'product-card';
    render(
      <MemoryRouter
        initialEntries={[
          AppRoute.Product.replace(':id', String(mockProduct.id)),
        ]}
      >
        <ProductCard
          onModalOpenClick={mockHandleModalOpenClick}
          card={mockProduct}
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId(productCardTestId)).toBeInTheDocument();
  });
});
