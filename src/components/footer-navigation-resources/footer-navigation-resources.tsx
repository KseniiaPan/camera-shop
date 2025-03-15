import {Link} from 'react-router-dom';

function FooterNavigationResources(): JSX.Element {
  return (
    <ul className="footer__list">
      <li className="footer__item">
        <Link className="link" to={'#'}>
                Курсы операторов
        </Link>
      </li>
      <li className="footer__item">
        <Link className="link" to={'#'}>
                Блог
        </Link>
      </li>
      <li className="footer__item">
        <Link className="link" to={'#'}>
                Сообщество
        </Link>
      </li>
    </ul>
  );
}

export default FooterNavigationResources;
