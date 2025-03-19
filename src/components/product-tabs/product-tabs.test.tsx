import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import ProductTabs from './product-tabs';
import { mockStore } from '../../utils/mocks';

describe('Component: ProductTabs', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ProductTabs />, mockStore);

    render(withStoreComponent);
    const mockCurrentProduct = mockStore.Product.currentProduct;
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();

    expect(
      screen.getByText(mockCurrentProduct.description)
    ).toBeInTheDocument();
    expect(screen.getByText(mockCurrentProduct.vendorCode)).toBeInTheDocument();
  });
});
