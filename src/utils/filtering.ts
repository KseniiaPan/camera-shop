import { ProductInfo } from '../types/product-types';
import { ProductFilters } from '../types/filter-types';
import { filterItems } from '../consts';

const getSearchedProducts = (
  products: ProductInfo[],
  searchText: string
): ProductInfo[] =>
  products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

const translateFilterItemName = (currentFilter: string) => {
  const currentFilterData = filterItems.find(
    (filterItem) => filterItem.name === currentFilter
  );
  return currentFilterData && currentFilterData.ruName;
};

const filterProducts = (
  products: ProductInfo[],
  category: ProductFilters['category'],
  types: ProductFilters['type'][],
  levels: ProductFilters['level'][],
  minPrice: ProductFilters['minPrice'],
  maxPrice: ProductFilters['maxPrice']
): ProductInfo[] => {
  let filteredProducts: ProductInfo[] = products;
  if (category) {
    const categoryRuName = translateFilterItemName(category);
    filteredProducts = products.filter(
      (product) => product.category === categoryRuName
    );
  }
  if (types.length > 0) {
    const typeRuNames = types.map(
      (name) => name && translateFilterItemName(name)
    );
    const filteredbyTypeProducts: ProductInfo[] = [];

    for (let i = 0; i < filteredProducts.length; i++) {
      for (let j = 0; j < typeRuNames.length; j++) {
        if (filteredProducts[i].type === typeRuNames[j]) {
          filteredbyTypeProducts.push(filteredProducts[i]);
        }
      }
    }
    filteredProducts = filteredbyTypeProducts;
  }

  if (levels.length > 0) {
    const levelRuNames = levels.map(
      (name) => name && translateFilterItemName(name)
    );
    const filteredByLevelProducts: ProductInfo[] = [];

    for (let i = 0; i < filteredProducts.length; i++) {
      for (let j = 0; j < levelRuNames.length; j++) {
        if (filteredProducts[i].level === levelRuNames[j]) {
          filteredByLevelProducts.push(filteredProducts[i]);
        }
      }
    }
    filteredProducts = filteredByLevelProducts;
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= Number(minPrice)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= Number(maxPrice)
    );
  }

  return filteredProducts;
};

export { getSearchedProducts, filterProducts };
