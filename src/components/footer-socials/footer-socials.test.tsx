import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FooterSocials from './footer-socials';

describe('Component: FooterSocials', () => {
  it('should render correctly', () => {
    const footerSocialsTestId = 'footer-socials';
    render(
      <MemoryRouter initialEntries={['#']}>
        <FooterSocials />
      </MemoryRouter>
    );
    const footerSocials = screen.getByTestId(footerSocialsTestId);
    expect(footerSocials).toBeInTheDocument();
  });
});
