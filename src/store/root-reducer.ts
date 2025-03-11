import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';
import {productProcess} from '../store/product-process/product-process';
import {reviewProcess} from '../store/review-process/review-process';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
});
