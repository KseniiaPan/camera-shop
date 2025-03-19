import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { toast } from 'react-toastify';
import { PromoProcess } from '../../types/state-types';
import { fetchPromoProductsAction } from '../api-actions';

const initialState: PromoProcess = {
  promoProducts: [],
  isPromoProductsDataLoading: false,
};

export const promoProcess = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoProductsAction.pending, (state) => {
        state.isPromoProductsDataLoading = true;
      })
      .addCase(fetchPromoProductsAction.fulfilled, (state, action) => {
        state.promoProducts = action.payload;
        state.isPromoProductsDataLoading = false;
      })
      .addCase(fetchPromoProductsAction.rejected, (state) => {
        state.isPromoProductsDataLoading = false;
        toast.error(
          'Ошибка при загрузке информации о новинках. Попробуйте перезагрузить страницу.'
        );
      });
  },
});
