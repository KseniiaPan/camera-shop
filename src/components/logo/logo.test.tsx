import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from './logo';
import { AppRoute, LogoOption } from '../../consts';

describe('Component: Logo', () => {
  it('should render correctly when used in header', () => {
    const expectedLabelText = 'Переход на главную';
    const logoOption = LogoOption.Header;
    render(<MemoryRouter initialEntries={[AppRoute.Main]}> <Logo logoOption={logoOption}/></MemoryRouter>);
    expect(screen.getByLabelText(expectedLabelText)).toBeInTheDocument();
  });

  it('should render correctly when used in footer', () => {
    const expectedLabelText = 'Переход на главную';
    const logoOption = LogoOption.Footer;
    render(<MemoryRouter initialEntries={[AppRoute.Main]}> <Logo logoOption={logoOption}/></MemoryRouter>);
    expect(screen.getByLabelText(expectedLabelText)).toBeInTheDocument();
  });
});
