import { datatype } from 'faker';
import { ProductInfo } from '../types/product-types';
import { Review } from '../types/review-types';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state-types';
import { NameSpace } from '../consts';

const makeFakeProduct = (): ProductInfo => ({
  id: datatype.number(),
  name: datatype.string(),
  vendorCode: datatype.string(),
  type: datatype.string(),
  category: datatype.string(),
  description: datatype.string(),
  previewImg: datatype.string(),
  level: datatype.string(),
  price: datatype.number(),
  previewImg2x: datatype.string(),
  previewImgWebp: datatype.string(),
  previewImgWebp2x: datatype.string(),
  rating: datatype.number(),
  reviewCount: datatype.number(),
});

const makeFakeReview = (): Review => ({
  id: datatype.string(),
  userName: datatype.string(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  review: datatype.string(),
  rating: datatype.number(),
  createAt: datatype.string(),
  cameraId: datatype.number(),
});

export const mockProducts = new Array(20)
  .fill(null)
  .map(() => makeFakeProduct());

export const mockProduct = makeFakeProduct();

export const mockReviews = new Array(5).fill(null).map(() => makeFakeReview());

export const mockOrder = {
  camerasIds: [datatype.number()],
  coupon: null,
  tel: datatype.string(),
};

export const mockUserOrder = {
  camerasIds: [datatype.number()],
  coupon: null,
  tel: datatype.string(),
};

export const mockStore = {
  [NameSpace.Product]: {
    products: mockProducts,
    currentProduct: mockProduct,
    similarProducts: [],
    isProductsDataLoading: false,
    isCurrentProductLoading: false,
    isDataLoadingError: false,
    isSimilarProductsDataLoading: false,
  },
  [NameSpace.Review]: {
    reviews: mockReviews,
    isReviewsDataLoading: false,
  },
  [NameSpace.Order]: {
    isOrderPosting: false,
  },
};

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;
export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);
