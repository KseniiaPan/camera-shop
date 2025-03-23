import {productProcess} from './product-process';
import {fetchProductsAction, fetchCurrentProductAction, fetchSimilarProductsAction} from '../api-actions';
import {mockProducts, mockProduct} from '../../utils/mocks';

const initialState = {
  products: [],
  currentProduct: null,
  similarProducts: [],
  isProductsDataLoading: false,
  isCurrentProductLoading: true,
  isSimilarProductsDataLoading: false,
  isDataLoadingError: false,
};

describe('ProductProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...initialState,
      products: mockProducts,
      currentProduct: mockProduct,
      isCurrentProductLoading: false,
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

  it('should set "isCurrentProductLoading" to "false", "currentProduct" to an object with full product information with "fetchCurrentProductAction.fulfilled"', () => {
    const expectedState = { ...initialState, currentProduct: mockProduct, isCurrentProductLoading: false };
    const result = productProcess.reducer(
      undefined,
      fetchCurrentProductAction.fulfilled(mockProduct, '', mockProduct.id)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isCurrentProductLoading" to "false", "isDataLoadingError" to "true" with "fetchCurrentProductAction.rejected"', () => {
    const expectedState = { ...initialState, isCurrentProductLoading: false, isDataLoadingError: true };
    const result = productProcess.reducer(
      undefined,
      fetchCurrentProductAction.rejected
    );
    expect(result).toEqual(expectedState);
  });


  it('should set "isSimilarProductsDataLoading" to "true" with "fetchSimilarProductsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isSimilarProductsDataLoading: true,
    };
    const result = productProcess.reducer(
      undefined,
      fetchSimilarProductsAction.pending
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isSimilarProductsDataLoading" to "false", "similarProducts" to an array with similar products information with "fetchSimilarProductsAction.fulfilled"', () => {
    const expectedState = { ...initialState, similarProducts: mockProducts, isSimilarProductsDataLoading: false };
    const result = productProcess.reducer(
      undefined,
      fetchSimilarProductsAction.fulfilled(mockProducts, '', mockProduct.id)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isSimilarProductsDataLoading" to "false", "isDataLoadingError" to "true" with "fetchSimilarProductsAction.rejected"', () => {
    const expectedState = { ...initialState, isSimilarProductsDataLoading: false};
    const result = productProcess.reducer(
      undefined,
      fetchSimilarProductsAction.rejected
    );
    expect(result).toEqual(expectedState);
  });
});
