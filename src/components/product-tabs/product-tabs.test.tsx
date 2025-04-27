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

    const characteristicsTab = screen.getByText(/Характеристики/i);
    const descriptionTab = screen.getByText(/Описание/i);

    expect(characteristicsTab).toBeInTheDocument();
    expect(descriptionTab).toBeInTheDocument();
    expect(screen.getByText(mockCurrentProduct.vendorCode)).toBeInTheDocument();
  });
});
