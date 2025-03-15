import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Breadcrumbs from './breadcrumbs';
import {AppRoute} from '../../consts';
import {mockProduct} from '../../utils/mocks';

describe('Component: Breadcrumbs', () => {
  it('should render correctly when used on the main page', () => {
    const breadcrumbsTestId = 'breadcrumbs';
    const fakeCameraName = mockProduct.name;
    render(<MemoryRouter initialEntries={[AppRoute.Main]}> <Breadcrumbs cameraName={fakeCameraName}/></MemoryRouter>);
    const navigationList = screen.getByTestId(breadcrumbsTestId);
    expect(navigationList).toBeInTheDocument();
  });

  it('should render correctly when used on the product page', () => {
    const breadcrumbsTestId = 'breadcrumbs';
    render(<MemoryRouter initialEntries={[AppRoute.Main]}> <Breadcrumbs/></MemoryRouter>);
    const navigationList = screen.getByTestId(breadcrumbsTestId);
    expect(navigationList).toBeInTheDocument();
  });
});
