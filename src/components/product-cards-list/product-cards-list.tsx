import ProductCard from '../../components/product-card/product-card';
import {useAppSelector} from '../../hooks/index';
import {getProductsData} from '../../store/product-process/selectors';

type ProductCardsListProps = {
  onModalOpenClick: (id: number | null) => void;
}

function ProductCardsList({onModalOpenClick}: ProductCardsListProps): JSX.Element {
  const products = useAppSelector(getProductsData);

  return (
    <div className="cards catalog__cards" data-testid="product-cards-list">
      {
        products.map ((product) => (
          <ProductCard
            onModalOpenClick={onModalOpenClick}
            key={product.id}
            card={product}
          />
        ))
      }
    </div>
  );
}

export default ProductCardsList;
