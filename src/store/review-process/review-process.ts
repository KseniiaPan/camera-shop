import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts';
import {toast} from 'react-toastify';
import {ReviewsProcess} from '../../types/state-types';
import {fetchReviewsAction} from '../api-actions';

const initialState: ReviewsProcess = {
  reviews: [],
  isReviewsDataLoading: false,
};

export const reviewProcess = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsDataLoading = false;
        toast.error('Ошибка при загрузке информации. Попробуйте еще раз.');
      });
  },
});
