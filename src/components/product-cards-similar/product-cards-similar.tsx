import { useState } from 'react';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import { ProductInfo } from '../../types/product-types';
import { SimilarProductsSlider, ProductsListOption } from '../../consts';

type ProductCardsSimilarProps = {
  similarProducts: ProductInfo[];
  onModalOpenClick: (id: number | null) => void;
};

function ProductCardsSimilar({
  similarProducts,
  onModalOpenClick,
}: ProductCardsSimilarProps): JSX.Element {
  const [firstCount, setFirstCount] = useState<number>(
    SimilarProductsSlider.DefaultFisrstIndex
  );
  const [lastCount, setLastCount] = useState<number>(
    SimilarProductsSlider.DefaultLastIndex
  );

  const displaySimilarProducts = () => {
    const displayedSimilarProducts = similarProducts.slice(
      firstCount,
      lastCount
    );
    return displayedSimilarProducts;
  };

  const displayedSimilarProducts = displaySimilarProducts();

  const isNextButtonDisabled = lastCount >= similarProducts.length;

  const isPreviousButtonDisabled =
    firstCount === SimilarProductsSlider.DefaultFisrstIndex;

  const handleNextSlideButtonClick = () => {
    setFirstCount(firstCount + SimilarProductsSlider.Step);
    setLastCount(lastCount + SimilarProductsSlider.Step);
  };

  const handlePreviousSlideButtonClick = () => {
    setFirstCount(firstCount - SimilarProductsSlider.Step);
    setLastCount(lastCount - SimilarProductsSlider.Step);
  };

  return (
    <div className="page-content__section">
      {similarProducts.length > 0 && (
        <section className="product-similar">
          <div className="container">
            <h2 className="title title--h3">Похожие товары</h2>
            <div className="product-similar__slider">
              <ProductCardsList
                products={displayedSimilarProducts}
                onModalOpenClick={onModalOpenClick}
                productsListOption={ProductsListOption.SimilarList}
                isActive
              />
              <button
                className="slider-controls slider-controls--prev"
                type="button"
                aria-label="Предыдущий слайд"
                onMouseDown={handlePreviousSlideButtonClick}
                disabled={isPreviousButtonDisabled}
              >
                <svg width={7} height={12} aria-hidden="true">
                  <use xlinkHref="#icon-arrow" />
                </svg>
              </button>
              <button
                className="slider-controls slider-controls--next"
                type="button"
                aria-label="Следующий слайд"
                onMouseDown={handleNextSlideButtonClick}
                disabled={isNextButtonDisabled}
              >
                <svg width={7} height={12} aria-hidden="true">
                  <use xlinkHref="#icon-arrow" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductCardsSimilar;
