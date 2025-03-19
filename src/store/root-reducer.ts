import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';
import {productProcess} from '../store/product-process/product-process';
import {reviewProcess} from '../store/review-process/review-process';
import { orderProcess } from '../store/order-process/order-process';
import { promoProcess } from '../store/promo-process/promo-process';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
  [NameSpace.Order]: orderProcess.reducer,
  [NameSpace.Promo]: promoProcess.reducer,
});
