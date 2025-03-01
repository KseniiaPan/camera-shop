import ProductCard from '../../components/product-card/product-card';
import {useAppSelector} from '../../hooks/index';
import {getProductsData} from '../../store/product-process/selectors';

function ProductCardsList(): JSX.Element {
  const products = useAppSelector(getProductsData);

  return (
    <div className="cards catalog__cards">
      {
        products.map ((product) => (
          <ProductCard
            key={product.id}
            card={product}
          />
        ))
      }
    </div>
  );
}

export default ProductCardsList;
