import {ProductPreviewCard} from '../../types/product';
import ProductCard from '../../components/product-card/product-card';

type ProductCardsListProps = {
  cards: ProductPreviewCard[];
}

function ProductCardsList({cards}: ProductCardsListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {
        cards.map ((card) => (
          <ProductCard
            key={card.id}
            card={card}
          />
        ))
      }
    </div>
  );
}

export default ProductCardsList;
