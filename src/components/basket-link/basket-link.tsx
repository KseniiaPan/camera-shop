import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { getStoredCart } from '../../utils/common';
import { ProductInfo } from '../../types/product-types';

function BasketLink(): JSX.Element {
  const currentCartProducts = getStoredCart<ProductInfo[]>('cart', []);
  console.log(currentCartProducts);

  const sum: number|undefined = currentCartProducts && currentCartProducts.reduce(
    (accumulator, currentProduct) => {
      return accumulator + currentProduct.quantity;
    },
    0
  );
  console.log(sum);
  return (
    <Link
      className="header__basket-link"
      to={AppRoute.Cart}
      aria-label="Корзина"
    >
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      <span className="header__basket-count">{sum}</span>
    </Link>
  );
}

export default BasketLink;
