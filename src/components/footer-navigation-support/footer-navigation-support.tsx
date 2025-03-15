import {Link} from 'react-router-dom';

function FooterNavigationSupport(): JSX.Element {
  return (
    <ul className="footer__list">
      <li className="footer__item">
        <Link className="link" to={'#'}>
                FAQ
        </Link>
      </li>
      <li className="footer__item">
        <Link className="link" to={'#'}>
                Задать вопрос
        </Link>
      </li>
    </ul>
  );
}

export default FooterNavigationSupport;
