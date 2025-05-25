import { NameSpace } from '../../consts';
import { State } from '../../types/state-types';

export const getCurrentCartProductsAmount = (state: Pick<State, NameSpace.Order>): number | undefined => state[NameSpace.Order].currentCartProductsAmount;
export const getOrderPostingStatus = (state: Pick<State, NameSpace.Order>): boolean => state[NameSpace.Order].isOrderPosting;
