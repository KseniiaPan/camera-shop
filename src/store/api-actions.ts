import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state-types';
import {APIRoute} from '../consts';
import {ProductInfo} from '../types/product-types';
import {Review} from '../types/review-types';

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

export const fetchCurrentProductAction = createAsyncThunk<ProductInfo, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchDetailedProduct',
  async (id, {extra: api}) => {
    const {data} = await api.get<ProductInfo>(`${APIRoute.Cameras}/${id}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchReview', async (id, { extra: api }) => {
  const { data } = await api.get<Review[]>(
    `${APIRoute.Cameras}/${id}${APIRoute.Reviews}`
  );
  return data;
});
