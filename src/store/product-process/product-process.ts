import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts';
import {toast} from 'react-toastify';
import {ProductsProcess} from '../../types/state-types';
import {fetchProductsAction, fetchCurrentProductAction} from '../api-actions';

const initialState: ProductsProcess = {
  products: [],
  currentProduct: null,
  isProductsDataLoading: false,
  isCurrentProductLoading: false,
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
      })
      .addCase(fetchCurrentProductAction.pending, (state) => {
        state.isCurrentProductLoading = true;
      })
      .addCase(fetchCurrentProductAction.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.isCurrentProductLoading = false;
      })
      .addCase(fetchCurrentProductAction.rejected, (state) => {
        state.isCurrentProductLoading = false;
        toast.error('Ошибка при загрузке информации. Попробуйте еще раз.');
      });
  }
});
