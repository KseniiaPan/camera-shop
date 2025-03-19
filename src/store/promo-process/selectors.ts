import { NameSpace } from '../../consts';
import { State } from '../../types/state-types';
import { PrimaryProductInfo } from '../../types/product-types';

export const getPromoProductsData = (state: State): PrimaryProductInfo[] =>
  state[NameSpace.Promo].promoProducts;
export const getPromoProductsLoadingStatus = (state: State): boolean =>
  state[NameSpace.Promo].isPromoProductsDataLoading;
