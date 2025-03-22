import {LogoOption} from '../../consts';
import Logo from '../../components/logo/logo';
import FooterSocials from '../../components/footer-socials/footer-socials';
import FooterNavigation from '../../components/footer-navigation/footer-navigation';


function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Logo logoOption={LogoOption.Footer}/>
          <p className="footer__description">
          Интернет-магазин фото- и видеотехники
          </p>
          <FooterSocials />
        </div>
        <FooterNavigation />
      </div>
    </footer>
  );
}

export default Footer;
