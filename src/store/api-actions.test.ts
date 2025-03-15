import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes, mockProducts, mockProduct, mockReviews, mockUserOrder} from '../utils/mocks';
import {State} from '../types/state-types';
import {fetchProductsAction, fetchCurrentProductAction, fetchReviewsAction, postOrderAction} from './api-actions';
import { APIRoute } from '../consts';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('fetchProductsAction', () => {
    it('should dispatch "fetchProductsAction.pending", "fetchProductsAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockProducts);

      await store.dispatch(fetchProductsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchProductsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchProductsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.fulfilled.type,
      ]);

      expect(fetchProductsActionFulfilled.payload).toEqual(mockProducts);
    });

    it('should dispatch "fetchProductsAction.pending", "fetchProductsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(400, []);

      await store.dispatch(fetchProductsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.rejected.type,
      ]);
    });
  });

  describe('fetchCurrentProductAction', () => {
    it('should dispatch "fetchCurrentProductAction.pending", "fetchCurrentProductAction.fulfilled", when server response 200', async () => {
      const mockId = 1;
      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${mockId}`)
        .reply(200, mockProduct);

      await store.dispatch(fetchCurrentProductAction(mockId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCurrentProductActionFulfilled = emittedActions.at(
        1
      ) as ReturnType<typeof fetchCurrentProductAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCurrentProductAction.pending.type,
        fetchCurrentProductAction.fulfilled.type,
      ]);

      expect(fetchCurrentProductActionFulfilled.payload).toEqual(mockProduct);
    });

    it('should dispatch "fetchCurrentProductAction.pending", "fetchCurrentProductAction.rejected" when server response 400', async () => {
      const mockId = 1;
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockId}`).reply(400, []);

      await store.dispatch(fetchCurrentProductAction(mockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCurrentProductAction.pending.type,
        fetchCurrentProductAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async () => {
      const mockId = 1;
      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${mockId}${APIRoute.Reviews}`)
        .reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(mockId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchReviewsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      const mockId = 1;
      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${mockId}${APIRoute.Reviews}`)
        .reply(400, []);

      await store.dispatch(fetchReviewsAction(mockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('postOrderAction', () => {
    it('should dispatch "postOrderAction.pending", "postOrderAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.Order).reply(200);

      await store.dispatch(postOrderAction(mockUserOrder));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postOrderAction.pending.type,
        postOrderAction.fulfilled.type,
      ]);
    });

    it('should dispatch "postOrderAction.pending", "postOrderAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Order).reply(400);

      await store.dispatch(postOrderAction(mockUserOrder));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postOrderAction.pending.type,
        postOrderAction.rejected.type,
      ]);
    });
  });
});
