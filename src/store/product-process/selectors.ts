import {NameSpace} from '../../consts';
import {State} from '../../types/state-types';
import {ProductPreviewCard} from '../../types/product-types';

export const getProductsData = (state: State): ProductPreviewCard[] => state[NameSpace.Product].products;
export const getProductsLoadingStatus = (state: State): boolean => state[NameSpace.Product].isProductsDataLoading;
export const getDetailedProductData = (state: State): null | ProductPreviewCard => state[NameSpace.Product].detailedProduct;
export const getDetailedProductLoadingStatus = (state: State): boolean => state[NameSpace.Product].isDetailedProductLoading;
