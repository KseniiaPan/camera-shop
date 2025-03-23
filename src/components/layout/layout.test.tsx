import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './layout';
import { AppRoute } from '../../consts';


describe('Component: Layout', () => {
  it('should render correctly', () => {
    const layoutTestId = 'app-wrapper';
    render(
      <MemoryRouter initialEntries={[AppRoute.Main, AppRoute.Product, AppRoute.NotFound]}>
        <Layout />
      </MemoryRouter>
    );
    expect(screen.getByTestId(layoutTestId)).toBeInTheDocument();
  });
});
