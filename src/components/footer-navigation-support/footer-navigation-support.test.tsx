import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FooterNavigationSupport from './footer-navigation-support';

describe('Component: FooterNavigationSupport', () => {
  it('should render correctly', () => {
    const footerNavigationSupportTestId = 'footer-navigation-support';
    render(
      <MemoryRouter initialEntries={['#']}>
        <FooterNavigationSupport />
      </MemoryRouter>
    );
    const footerNavigationSupport = screen.getByTestId(
      footerNavigationSupportTestId
    );
    expect(footerNavigationSupport).toBeInTheDocument();
  });
});
