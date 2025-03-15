import {reviewProcess} from './review-process';
import {fetchReviewsAction} from '../api-actions';
import {mockReviews, mockProduct} from '../../utils/mocks';

const initialState = {
  reviews: [],
  isReviewsDataLoading: false,
};

describe('ReviewProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...initialState,
      reviews: mockReviews,
    };
    const result = reviewProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState };
    const result = reviewProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "true" with "fetchReviewsAction.pending"', () => {
    const expectedState = { ...initialState, isReviewsDataLoading: true };
    const result = reviewProcess.reducer(undefined, fetchReviewsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "false", "reviews" to an array with reviews with "fetchReviewsAction.fulfilled"', () => {
    const expectedState = { ...initialState, reviews: mockReviews };
    const result = reviewProcess.reducer(
      undefined,
      fetchReviewsAction.fulfilled(mockReviews, '', mockProduct.id)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "false" with "fetchReviewsAction.rejected"', () => {
    const expectedState = { ...initialState };
    const result = reviewProcess.reducer(
      undefined,
      fetchReviewsAction.rejected
    );
    expect(result).toEqual(expectedState);
  });
});
