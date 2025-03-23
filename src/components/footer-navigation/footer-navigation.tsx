import { NavigationOption } from '../../consts';
import NavigationList from '../../components/navigation-list/navigation-list';
import FooterNavigationResources from '../../components/footer-navigation-resources/footer-navigation-resources';
import FooterNavigationSupport from '../../components/footer-navigation-support/footer-navigation-support';

function FooterNavigation(): JSX.Element {
  return (
    <ul className="footer__nav" data-testid="footer-navigation">
      <li className="footer__nav-item">
        <p className="footer__title">Навигация</p>
        <NavigationList navigationOption={NavigationOption.Footer}/>
      </li>
      <li className="footer__nav-item">
        <p className="footer__title">Ресурсы</p>
        <FooterNavigationResources />
      </li>
      <li className="footer__nav-item">
        <p className="footer__title">Поддержка</p>
        <FooterNavigationSupport />
      </li>
    </ul>
  );
}

export default FooterNavigation;

