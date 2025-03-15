import {orderProcess} from './order-process';
import {postOrderAction} from '../api-actions';
import {mockOrder} from '../../utils/mocks';

describe('OrderProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { isOrderPosting: true };
    const result = orderProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { isOrderPosting: false };
    const result = orderProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isOrderPosting" to "true" with "postOrderAction.pending"', () => {
    const expectedState = { isOrderPosting: true };
    const result = orderProcess.reducer(undefined, postOrderAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isOrderPosting" to "false" with "postOrderAction.fulfilled"', () => {
    const expectedState = { isOrderPosting: false };
    const result = orderProcess.reducer(
      undefined,
      postOrderAction.fulfilled(undefined, '', mockOrder)
    );
    expect(result).toEqual(expectedState);
  });
});
