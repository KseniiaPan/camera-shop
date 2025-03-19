import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FooterNavigationResources from './footer-navigation-resources';

describe('Component: FooterNavigationResources', () => {
  it('should render correctly', () => {
    const footerNavigationResourcesTestId = 'footer-navigation-resources';
    render(
      <MemoryRouter initialEntries={['#']}>
        <FooterNavigationResources />
      </MemoryRouter>
    );
    const footerNavigationResources = screen.getByTestId(
      footerNavigationResourcesTestId
    );
    expect(footerNavigationResources).toBeInTheDocument();
  });
});
