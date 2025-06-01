import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from './breadcrumbs';
import { AppRoute } from '../../consts';
import { mockProduct } from '../../utils/mocks';

describe('Component: Breadcrumbs', () => {
  it('should render correctly when used on the main page', () => {
    const breadcrumbsTestId = 'breadcrumbs';

    render(<MemoryRouter initialEntries={[AppRoute.Main]}> <Breadcrumbs/></MemoryRouter>);

    const breadcrumbs = screen.getByTestId(breadcrumbsTestId);
    expect(breadcrumbs).toBeInTheDocument();
  });

  it('should render correctly when used on the product page', () => {
    const breadcrumbsTestId = 'breadcrumbs';
    const fakeCameraName = mockProduct.name;

    render(<MemoryRouter initialEntries={[AppRoute.Product]}> <Breadcrumbs cameraName={fakeCameraName}/></MemoryRouter>);

    const breadcrumbs = screen.getByTestId(breadcrumbsTestId);
    expect(breadcrumbs).toBeInTheDocument();
  });

  it('should render correctly when used on the basket page', () => {
    const breadcrumbsTestId = 'breadcrumbs';

    render(<MemoryRouter initialEntries={[AppRoute.Cart]}> <Breadcrumbs isBasket/></MemoryRouter>);

    const breadcrumbs = screen.getByTestId(breadcrumbsTestId);
    expect(breadcrumbs).toBeInTheDocument();
  });

});
