import { NameSpace, ValidityStatus } from '../../consts';
import { State } from '../../types/state-types';

export const getCurrentCartProductsAmount = (state: Pick<State, NameSpace.Order>): number | undefined => state[NameSpace.Order].currentCartProductsAmount;
export const getOrderPostingStatus = (state: Pick<State, NameSpace.Order>): boolean => state[NameSpace.Order].isOrderPosting;
export const getCouponPostingStatus = (state: Pick<State, NameSpace.Order>): boolean => state[NameSpace.Order].isCouponPosting;
export const getCouponDiscount = (state: Pick<State, NameSpace.Order>): number | undefined => state[NameSpace.Order].couponDiscount;
export const getCouponValidityStatus = (state: Pick<State, NameSpace.Order>): ValidityStatus | undefined => state[NameSpace.Order].couponValidityStatus;
