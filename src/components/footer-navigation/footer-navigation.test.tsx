import { render, screen } from '@testing-library/react';
import FooterNavigation from './footer-navigation';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../../consts';

describe('Component: FooterNavigation', () => {
  it('should render correctly', () => {
    const FooterNavigationTestId = 'footer-navigation';
    render(
      <MemoryRouter initialEntries={['#', AppRoute.Main]}>
        <FooterNavigation />
      </MemoryRouter>
    );
    expect(screen.getByTestId(FooterNavigationTestId)).toBeInTheDocument();
    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();
    expect(screen.getByText(/Ресурсы/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
  });
});
