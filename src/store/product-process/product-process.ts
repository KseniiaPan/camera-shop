import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts';
import {toast} from 'react-toastify';
import {ProductsProcess} from '../../types/state-types';
import {fetchProductsAction} from '../api-actions';

const initialState: ProductsProcess = {
  products: [],
  isProductsDataLoading: false,
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsDataLoading = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsDataLoading = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isProductsDataLoading = false;
        toast.error('Ошибка при загрузке информации. Попробуйте еще раз.');
      });
  }
});
