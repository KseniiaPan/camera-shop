import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './layout';
import { AppRoute } from '../../consts';
import { withStore } from '../../utils/mock-component';
import { mockStore } from '../../utils/mocks';


describe('Component: Layout', () => {
  it('should render correctly', () => {
    const layoutTestId = 'app-wrapper';

    const { withStoreComponent } = withStore(
      <Layout />,
      mockStore);

    render(
      <MemoryRouter initialEntries={[AppRoute.Main, AppRoute.Product, AppRoute.NotFound]}>
        {withStoreComponent}
      </MemoryRouter>
    );
    expect(screen.getByTestId(layoutTestId)).toBeInTheDocument();
  });
});
