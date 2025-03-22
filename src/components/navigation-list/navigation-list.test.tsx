import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import NavigationList from './navigation-list';
import {AppRoute, NavigationOption} from '../../consts';

describe('Component: Navigation List', () => {
  it('should render correctly when used in header', () => {
    const navigationListTestId = 'navigation-list';
    const navigationOption = NavigationOption.Main;
    render(<MemoryRouter initialEntries={[AppRoute.Main, '#']}> <NavigationList navigationOption={navigationOption}/></MemoryRouter>);
    const navigationList = screen.getByTestId(navigationListTestId);
    expect(navigationList).toBeInTheDocument();
  });

  it('should render correctly when used in footer', () => {
    const navigationListTestId = 'navigation-list';
    const navigationOption = NavigationOption.Footer;
    render(<MemoryRouter initialEntries={[AppRoute.Main, '#']}> <NavigationList navigationOption={navigationOption}/></MemoryRouter>);
    const navigationList = screen.getByTestId(navigationListTestId);
    expect(navigationList).toBeInTheDocument();
  });
});
