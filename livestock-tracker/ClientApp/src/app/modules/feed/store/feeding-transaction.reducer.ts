import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { PagedData } from '@core/models/paged-data.model';
import { FeedingTransactionState, PayloadAction } from '@core/store';
import { crudReducer } from '@core/store/crud.reducer';
import {
  ActionTypes,
  SelectFeedTransaction
} from '@feed/store/feeding-transaction.actions';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { FeedingTransactionKey } from './constants';

export const feedingTransactionAdapter = createEntityAdapter<
  FeedingTransaction
>({
  selectId: (transaction: FeedingTransaction) => transaction.id,
  sortComparer: false,
});

export const initialState: FeedingTransactionState = feedingTransactionAdapter.getInitialState(
  {
    selectedId: null,
    isPending: false,
    isFetching: false,
    error: null,
    pageNumber: 0,
    pageSize: 10,
    recordCount: 0,
  }
);

export function feedingTransactionReducer(
  state: FeedingTransactionState = initialState,
  action: Action
): FeedingTransactionState {
  switch (action.type) {
    case ActionTypes.SELECT_FEED_TRANSACTION:
      return {
        ...state,
        selectedId: (<SelectFeedTransaction>action).transactionId,
      };
    case ActionTypes.API_FETCH_FEED_TRANSACTION:
      const apiAction = <PayloadAction<PagedData<FeedingTransaction>>>action;
      const payloadAction: PayloadAction<FeedingTransaction[]> = {
        type: ActionTypes.API_FETCH_FEED_TRANSACTION,
        payload: apiAction.payload.data,
      };
      return {
        ...crudReducer(
          FeedingTransactionKey,
          feedingTransactionAdapter,
          state,
          payloadAction
        ),
        pageNumber: apiAction.payload.currentPage,
        pageSize: apiAction.payload.pageSize,
        recordCount: apiAction.payload.totalRecordCount,
      };
    default:
      return {
        ...state,
        ...crudReducer(
          FeedingTransactionKey,
          feedingTransactionAdapter,
          state,
          action
        ),
      };
  }
}
