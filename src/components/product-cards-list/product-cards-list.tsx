import ProductCard from '../../components/product-card/product-card';
import { ProductsListOption } from '../../consts';
import { ProductInfo } from '../../types/product-types';

type ProductCardsListProps = {
  products: ProductInfo[];
  onModalOpenClick: (id: number | null) => void;
  productsListOption: string;
  isActive?: boolean | undefined;
};

function ProductCardsList({products, onModalOpenClick, productsListOption, isActive}: ProductCardsListProps): JSX.Element {
  return (
    <div
      className={
        productsListOption === ProductsListOption.CatalogList
          ? 'cards catalog__cards'
          : 'product-similar__slider-list'
      }
      data-testid="product-cards-list"
    >
      {products.map((product) => (
        <ProductCard
          onModalOpenClick={onModalOpenClick}
          key={product.id}
          card={product}
          isActive={isActive}
        />
      ))}
    </div>
  );
}

export default ProductCardsList;
