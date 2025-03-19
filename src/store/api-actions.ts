import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state-types';
import {APIRoute} from '../consts';
import {ProductInfo, PrimaryProductInfo} from '../types/product-types';
import {Review} from '../types/review-types';
import {Order} from '../types/order-types';

export const fetchProductsAction = createAsyncThunk<ProductInfo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ProductInfo[]>(APIRoute.Cameras);
    return data;
  },
);

export const fetchCurrentProductAction = createAsyncThunk<ProductInfo, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCurrentProduct',
  async (id, {extra: api}) => {
    const {data} = await api.get<ProductInfo>(`${APIRoute.Cameras}/${id}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchReviews', async (id, { extra: api }) => {
  const { data } = await api.get<Review[]>(
    `${APIRoute.Cameras}/${id}${APIRoute.Reviews}`
  );
  return data;
});

export const postOrderAction = createAsyncThunk<
void,
Order,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/postOrder', async (userOrder, { extra: api }) => {
  await api.post<Order>(APIRoute.Order, userOrder);
});

export const fetchPromoProductsAction = createAsyncThunk<
  PrimaryProductInfo[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromoProducts', async (_arg, { extra: api }) => {
  const { data } = await api.get<PrimaryProductInfo[]>(APIRoute.Promo);
  return data;
});
