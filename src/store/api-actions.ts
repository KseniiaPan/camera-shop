import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state-types';
import {APIRoute} from '../consts';
import {ProductPreviewCard} from '../types/product-types';

export const fetchProductsAction = createAsyncThunk<ProductPreviewCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ProductPreviewCard[]>(APIRoute.Cameras);
    return data;
  },
);

export const fetchDetailedProductAction = createAsyncThunk<ProductPreviewCard, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchDetailedProduct',
  async (id, {extra: api}) => {
    const {data} = await api.get<ProductPreviewCard>(`${APIRoute.Cameras}/${id}`);
    return data;
  },
);
