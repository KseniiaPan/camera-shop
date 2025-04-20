import { SortingOption } from '../consts';
import { Review } from '../types/review-types';
import { ProductInfo } from '../types/product-types';

const sortReviews = (reviews: Review[]) =>
  [...reviews].sort(
    (reviewA, reviewB) =>
      Date.parse(reviewB.createAt) - Date.parse(reviewA.createAt)
  );

const sortProductsBy = {
  [SortingOption.MinPriceFirst]: (products: ProductInfo[]) =>
    [...products].sort(
      (firstProduct, secondProduct) => firstProduct.price - secondProduct.price
    ),
  [SortingOption.MaxPriceFirst]: (products: ProductInfo[]) =>
    [...products].sort(
      (firstProduct, secondProduct) => secondProduct.price - firstProduct.price
    ),
  [SortingOption.LeastRatedFirst]: (products: ProductInfo[]) =>
    [...products].sort(
      (firstProduct, secondProduct) =>
        firstProduct.rating - secondProduct.rating
    ),
  [SortingOption.TopRatedFirst]: (products: ProductInfo[]) =>
    [...products].sort(
      (firstProduct, secondProduct) =>
        secondProduct.rating - firstProduct.rating
    ),
};

const sortProducts = (
  products: ProductInfo[],
  chosenSortingOption: SortingOption
) => sortProductsBy[chosenSortingOption](products);

export { sortReviews, sortProducts };
