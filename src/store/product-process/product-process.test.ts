import {productProcess} from './product-process';
import {fetchProductsAction, fetchCurrentProductAction} from '../api-actions';
import {mockProducts, mockProduct} from '../../utils/mocks';

const initialState = {
  products: [],
  currentProduct: null,
  isProductsDataLoading: false,
  isCurrentProductLoading: false,
  isDataLoadingError: false
};

describe('ProductProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...initialState,
      products: mockProducts,
      currentProduct: mockProduct,
    };
    const result = productProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState };
    const result = productProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isProductsDataLoading" to "true" with "fetchProductsAction.pending"', () => {
    const expectedState = { ...initialState, isProductsDataLoading: true };
    const result = productProcess.reducer(
      undefined,
      fetchProductsAction.pending
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isProductsDataLoading" to "false", "products" to an array with products with "fetchProductsAction.fulfilled"', () => {
    const expectedState = { ...initialState, products: mockProducts };
    const result = productProcess.reducer(
      undefined,
      fetchProductsAction.fulfilled(mockProducts, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isProductsDataLoading" to "false", "isDataLoadingError" to "true" with "fetchProductsAction.rejected"', () => {
    const expectedState = { ...initialState, isDataLoadingError: true };
    const result = productProcess.reducer(
      undefined,
      fetchProductsAction.rejected
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isCurrentProductLoading" to "true" with "fetchCurrentProductAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isCurrentProductLoading: true,
    };
    const result = productProcess.reducer(
      undefined,
      fetchCurrentProductAction.pending
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isCurrentProductLoading" to "false", "currentProduct" to an object with full offer information with "fetchCurrentProductAction.fulfilled"', () => {
    const expectedState = { ...initialState, currentProduct: mockProduct };
    const result = productProcess.reducer(
      undefined,
      fetchCurrentProductAction.fulfilled(mockProduct, '', mockProduct.id)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isCurrentProductLoading" to "false", "isDataLoadingError" to "true" with "fetchCurrentProductAction.rejected"', () => {
    const expectedState = { ...initialState, isDataLoadingError: true };
    const result = productProcess.reducer(
      undefined,
      fetchCurrentProductAction.rejected
    );
    expect(result).toEqual(expectedState);
  });
});
