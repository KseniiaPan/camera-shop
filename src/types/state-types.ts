import {store} from '../store/index';
import {ProductPreviewCard} from './product-types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ProductsProcess ={
  products: ProductPreviewCard[];
  detailedProduct: null | ProductPreviewCard;
  isProductsDataLoading: boolean;
  isDetailedProductLoading: boolean;
}
