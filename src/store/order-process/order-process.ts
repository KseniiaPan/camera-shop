import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, ValidityStatus } from '../../consts';
import { toast } from 'react-toastify';
import { OrderProcess } from '../../types/state-types';
import { postOrderAction, postCouponAction } from '../api-actions';

const initialState: OrderProcess = {
  isOrderPosting: false,
  currentCartProductsAmount: undefined,
  isCouponPosting: false,
  couponValidityStatus: undefined,
  couponDiscount: undefined,
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
      })
      .addCase(postCouponAction.pending, (state) => {
        state.isCouponPosting = true;
      })
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.isCouponPosting = false;
        state.couponDiscount = action.payload;
        state.couponValidityStatus = ValidityStatus.Valid;
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.isCouponPosting = false;
        state.couponValidityStatus = ValidityStatus.Invalid;
        toast.error('К сожалению, промокод не применен. Проверьте правильность написания промокода, убедитесь в наличии интернет-соединения и попробуйте еще раз');
      });
  },
});
export const { changeCartProductsAmount } = orderProcess.actions;
