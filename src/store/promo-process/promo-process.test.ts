import {promoProcess} from './promo-process';
import {fetchPromoProductsAction} from '../api-actions';
import {mockProducts} from '../../utils/mocks';

const initialState = {
  promoProducts: [],
  isPromoProductsDataLoading: false,
};

describe('PromoProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...initialState,
      promoProducts: mockProducts,
    };
    const result = promoProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState };
    const result = promoProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isPromoProductsDataLoading" to "true" with "fetchPromoProductsAction.pending"', () => {
    const expectedState = { ...initialState, isPromoProductsDataLoading: true };
    const result = promoProcess.reducer(
      undefined,
      fetchPromoProductsAction.pending
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isPromoProductsDataLoading" to "false", "promoProducts" to an array with promo products with "fetchPromoProductsAction.fulfilled"', () => {
    const expectedState = { ...initialState, promoProducts: mockProducts };
    const result = promoProcess.reducer(
      undefined,
      fetchPromoProductsAction.fulfilled(mockProducts, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isPromoProductsDataLoading" to "false" with "fetchPromoProductsAction.rejected"', () => {
    const expectedState = { ...initialState};
    const result = promoProcess.reducer(
      undefined,
      fetchPromoProductsAction.rejected
    );
    expect(result).toEqual(expectedState);
  });
});
