import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';
import {productProcess} from '../store/product-process/product-process';


export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
});
