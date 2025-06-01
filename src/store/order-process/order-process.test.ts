import {orderProcess} from './order-process';
import {postOrderAction} from '../api-actions';
import {mockOrder} from '../../utils/mocks';
import { datatype } from 'faker';
import { ValidityStatus } from '../../consts';

const initialState = {
  isOrderPosting: false,
  currentCartProductsAmount: undefined,
  isCouponPosting: false,
  couponValidityStatus: undefined,
  couponDiscount: undefined,
};

describe('OrderProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...initialState,
      couponDiscount: datatype.number(),
      couponValidityStatus: ValidityStatus.Valid,
      currentCartProductsAmount: datatype.number()
    };
    const result = orderProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState };
    const result = orderProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isOrderPosting" to "true" with "postOrderAction.pending"', () => {
    const expectedState = {...initialState, isOrderPosting: true };
    const result = orderProcess.reducer(undefined, postOrderAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isOrderPosting" to "false" with "postOrderAction.fulfilled"', () => {
    const expectedState = {...initialState};
    const result = orderProcess.reducer(
      undefined,
      postOrderAction.fulfilled(undefined, '', mockOrder)
    );
    expect(result).toEqual(expectedState);
  });

});
