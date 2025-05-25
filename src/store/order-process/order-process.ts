import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { toast } from 'react-toastify';
import { OrderProcess } from '../../types/state-types';
import { postOrderAction } from '../api-actions';

const initialState: OrderProcess = {
  isOrderPosting: false,
  currentCartProductsAmount: undefined,
};

export const orderProcess = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {
    changeCartProductsAmount: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.currentCartProductsAmount = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postOrderAction.pending, (state) => {
        state.isOrderPosting = true;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.isOrderPosting = false;
        toast.success('Ваш заказ успешно оофрмлен.');
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.isOrderPosting = false;
        toast.error('Ошибка при отправке заказа. Попробуйте еще раз.');
      });
  },
});
export const { changeCartProductsAmount } = orderProcess.actions;
