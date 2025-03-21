import {store} from '../store/index';
import {ProductInfo, PrimaryProductInfo} from './product-types';
import {Review} from './review-types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ProductsProcess = {
  products: ProductInfo[];
  currentProduct: null | ProductInfo;
  similarProducts: ProductInfo[];
  isProductsDataLoading: boolean;
  isCurrentProductLoading: boolean;
  isSimilarProductsDataLoading: boolean;
  isDataLoadingError: boolean;
};

export type ReviewsProcess = {
  reviews: Review[];
  isReviewsDataLoading: boolean;
};

export type OrderProcess = {
  isOrderPosting: boolean;
}

export type PromoProcess = {
  promoProducts: PrimaryProductInfo[];
  isPromoProductsDataLoading: boolean;
};
