import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { toast } from 'react-toastify';
import { OrderProcess } from '../../types/state-types';
import { postOrderAction } from '../api-actions';

const initialState: OrderProcess = {
  isOrderPosting: false,
};

export const orderProcess = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postOrderAction.pending, (state) => {
        state.isOrderPosting = true;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.isOrderPosting = false;
        toast.success('Ваш запрос успешно отправлен. Наш менеджер свяжется с вами в ближайшее время.');
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.isOrderPosting = false;
        toast.error('Ошибка при отправке запроса. Попробуйте еще раз.');
      });
  },
});
