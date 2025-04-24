import { SortingSection } from '../consts';
import { ProductSorting } from '../types/sorting-types';
import { Review } from '../types/review-types';
import { ProductInfo } from '../types/product-types';

const sortReviews = (reviews: Review[]) =>
  [...reviews].sort(
    (reviewA, reviewB) =>
      Date.parse(reviewB.createAt) - Date.parse(reviewA.createAt)
  );


const sortProducts = (currentSortOption: ProductSorting['sort'], currentSortDirection: ProductSorting['direction'], products: ProductInfo[]) => {
  let sortedPoducts = products;
  if (currentSortOption === SortingSection.Sort.price && currentSortDirection === SortingSection.Direction.up) {
    sortedPoducts = [...products].sort(
      (firstProduct, secondProduct) => firstProduct.price - secondProduct.price
    );
  }

  if (currentSortOption === SortingSection.Sort.price && currentSortDirection === SortingSection.Direction.down) {
    sortedPoducts = [...products].sort(
      (firstProduct, secondProduct) => secondProduct.price - firstProduct.price
    );
  }

  if (currentSortOption === SortingSection.Sort.popular && currentSortDirection === SortingSection.Direction.up) {
    sortedPoducts = [...products].sort(
      (firstProduct, secondProduct) =>
        firstProduct.rating - secondProduct.rating
    );
  }
  if (currentSortOption === SortingSection.Sort.popular && currentSortDirection === SortingSection.Direction.down) {
    sortedPoducts = [...products].sort(
      (firstProduct, secondProduct) =>
        secondProduct.rating - firstProduct.rating
    );
  }
  return sortedPoducts;
};

export { sortReviews, sortProducts };
