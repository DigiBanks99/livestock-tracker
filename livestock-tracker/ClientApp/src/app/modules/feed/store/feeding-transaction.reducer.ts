import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { FeedingTransactionState } from '@core/store';
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
  sortComparer: false
});

export const initialState: FeedingTransactionState = feedingTransactionAdapter.getInitialState(
  {
    selectedId: null,
    isPending: false,
    isFetching: false,
    error: null
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
        selectedId: (<SelectFeedTransaction>action).transactionId
      };
    default:
      return crudReducer(
        FeedingTransactionKey,
        feedingTransactionAdapter,
        state,
        action
      );
  }
}
