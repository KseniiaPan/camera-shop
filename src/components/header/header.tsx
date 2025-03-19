import {NavigationOption, LogoOption} from '../../consts';
import Logo from '../../components/logo/logo';
import NavigationList from '../../components/navigation-list/navigation-list';

function Header(): JSX.Element {
  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Logo logoOption={LogoOption.header}/>
        <nav className="main-nav header__main-nav">
          <NavigationList navigationOption={NavigationOption.main}/>
        </nav>
      </div>
    </header>
  );
}

export default Header;
