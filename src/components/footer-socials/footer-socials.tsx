import {Link} from 'react-router-dom';

function FooterSocials(): JSX.Element {
  return (
    <ul className="social" data-testid="footer-socials">
      <li className="social__item">
        <Link
          className="link"
          to="#"
          aria-label="Переход на страницу вконтакте"
        >
          <svg width={20} height={20} aria-hidden="true">
            <use xlinkHref="#icon-vk" />
          </svg>
        </Link>
      </li>
      <li className="social__item">
        <Link
          className="link"
          to="#"
          aria-label="Переход на страницу pinterest"
        >
          <svg width={20} height={20} aria-hidden="true">
            <use xlinkHref="#icon-pinterest" />
          </svg>
        </Link>
      </li>
      <li className="social__item">
        <Link
          className="link"
          to="#"
          aria-label="Переход на страницу reddit"
        >
          <svg width={20} height={20} aria-hidden="true">
            <use xlinkHref="#icon-reddit" />
          </svg>
        </Link>
      </li>
    </ul>
  );
}
export default FooterSocials;
