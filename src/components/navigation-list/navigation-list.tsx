import {Link} from 'react-router-dom';
import {AppRoute, NavigationOption} from '../../consts';
type NavigationListProps = {
  navigationOption: string;
}
function NavigationList({navigationOption}: NavigationListProps): JSX.Element {
  const linkClassName = `${navigationOption === NavigationOption.Main ? 'main-nav__link' : 'link'}`;
  return (
    <ul className={`${navigationOption}__list`} data-testid="navigation-list">
      <li className={`${navigationOption}__item`}>
        <Link className={linkClassName} to={AppRoute.Main}>
          Каталог
        </Link>
      </li>
      <li className={`${navigationOption}__item`}>
        <Link className={linkClassName} to="#">
          Гарантии
        </Link>
      </li>
      <li className={`${navigationOption}__item`}>
        <Link className={linkClassName} to="#">
          Доставка
        </Link>
      </li>
      <li className={`${navigationOption}__item`}>
        <Link className={linkClassName} to="#">
          О компании
        </Link>
      </li>
    </ul>
  );
}

export default NavigationList;
