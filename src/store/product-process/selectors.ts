import {NameSpace} from '../../consts';
import {State} from '../../types/state-types';
import {ProductInfo} from '../../types/product-types';

export const getProductsData = (state: State): ProductInfo[] => state[NameSpace.Product].products;
export const getProductsLoadingStatus = (state: State): boolean => state[NameSpace.Product].isProductsDataLoading;
export const getCurrentProductData = (state: State): null | ProductInfo => state[NameSpace.Product].currentProduct;
export const getCurrentProductLoadingStatus = (state: State): boolean => state[NameSpace.Product].isCurrentProductLoading;
