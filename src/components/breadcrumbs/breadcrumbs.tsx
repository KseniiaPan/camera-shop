import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

type BreadcrumbsProps = {
  cameraName?: string;
  isBasket?: boolean;
};
function Breadcrumbs({ cameraName, isBasket }: BreadcrumbsProps): JSX.Element {
  return (
    <div className="breadcrumbs" data-testid="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Main}>
              Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            {cameraName || isBasket ? (
              <Link className="breadcrumbs__link" to={AppRoute.Main}>
                Каталог
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </Link>
            ) : (
              <span className="breadcrumbs__link breadcrumbs__link--active">
                Каталог
              </span>
            )}
          </li>
          {cameraName && (
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {cameraName}
              </span>
            </li>
          )}
          {isBasket && (
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                Корзина
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
