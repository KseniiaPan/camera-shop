import {NameSpace} from '../../consts';
import {State} from '../../types/state-types';
import {Review} from '../../types/review-types';

export const getReviewsData = (state: State): Review[] => state[NameSpace.Review].reviews;
export const getReviewsLoadingStatus = (state: State): boolean => state[NameSpace.Review].isReviewsDataLoading;
