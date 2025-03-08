import {store} from '../store/index';
import {ProductInfo} from './product-types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ProductsProcess ={
  products: ProductInfo[];
  currentProduct: null | ProductInfo;
  isProductsDataLoading: boolean;
  isCurrentProductLoading: boolean;
}
