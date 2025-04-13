import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { AppRoute } from '../../consts';
import { ProductInfo } from '../../types/product-types';

type SearchSelectItemProps = {
  product: ProductInfo;
  index: number;
  currentFocus: number;
};

function SearchSelectItem({
  product,
  index,
  currentFocus,
}: SearchSelectItemProps): JSX.Element {
  const selectItemRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (selectItemRef.current && currentFocus === index) {
      selectItemRef.current.focus();
    }
  }, [currentFocus, index]);

  return (
    <Link to={AppRoute.Product.replace(':id', String(product.id))}>
      <li className="form-search__select-item" tabIndex={0} ref={selectItemRef}>
        {product.name}
      </li>
    </Link>
  );
}

export default SearchSelectItem;
