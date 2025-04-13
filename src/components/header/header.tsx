import { NavigationOption, LogoOption } from '../../consts';
import Logo from '../../components/logo/logo';
import NavigationList from '../../components/navigation-list/navigation-list';
import SearchForm from '../../components/search-form/search-form';
import BasketLink from '../../components/basket-link/basket-link';

function Header(): JSX.Element {
  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Logo logoOption={LogoOption.Header} />
        <nav className="main-nav header__main-nav">
          <NavigationList navigationOption={NavigationOption.Main} />
        </nav>
        <SearchForm />
        <BasketLink />
      </div>
    </header>
  );
}

export default Header;
