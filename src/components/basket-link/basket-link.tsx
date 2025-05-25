import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { getCurrentCartProductsAmount } from '../../store/order-process/selectors';
import { useAppSelector } from '../../hooks/index';

function BasketLink(): JSX.Element {
  const currentCartProductsAmount = useAppSelector(
    getCurrentCartProductsAmount
  );
  return (
    <Link
      className="header__basket-link"
      to={AppRoute.Cart}
      aria-label="Корзина"
    >
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      {currentCartProductsAmount !== undefined &&
        currentCartProductsAmount !== 0 && (
        <span className="header__basket-count">
          {currentCartProductsAmount}
        </span>
      )}
    </Link>
  );
}

export default BasketLink;
