import {Link} from 'react-router-dom';
import {AppRoute, LogoOption} from '../../consts';

type LogoProps = {
  logoOption: string;
}
function Logo({logoOption}: LogoProps): JSX.Element {
  return (
    <Link
      className={`${logoOption}__logo`}
      to={AppRoute.Main}
      aria-label="Переход на главную"
    >
      <svg width={100} height={36} aria-hidden="true">
        <use xlinkHref={`#icon-logo${logoOption === LogoOption.footer ? '-mono' : ''}`} />
      </svg>
    </Link>
  );
}

export default Logo;

