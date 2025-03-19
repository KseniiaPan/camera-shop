import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../../consts';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter initialEntries={['#', AppRoute.Main]}>
        <Footer />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Интернет-магазин фото- и видеотехники/i)
    ).toBeInTheDocument();
  });
});
