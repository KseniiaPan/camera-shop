import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { withStore } from '../../utils/mock-component';
import ProductTabs from './product-tabs';
import { mockStore } from '../../utils/mocks';
import { AppRoute } from '../../consts';

describe('Component: ProductTabs', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ProductTabs />, mockStore);

    render(
      <MemoryRouter
        initialEntries={[AppRoute.Main]}
      >
        {withStoreComponent}
      </MemoryRouter>);

    const mockCurrentProduct = mockStore.Product.currentProduct;
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();

    expect(
      screen.getByText(mockCurrentProduct.description)
    ).toBeInTheDocument();
    expect(screen.getByText(mockCurrentProduct.vendorCode)).toBeInTheDocument();
  });
});
