import { SaveState } from '@core/models';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { FeedingTransactionState } from '@core/store';
import { crudReducer } from '@core/store/crud.reducer';
import {
  FeedingTranscationActionTypes,
  SelectFeedTransactionAction
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
    error: null,
    pageNumber: 0,
    pageSize: 10,
    recordCount: 0,
    saveState: SaveState.New
  }
);

export function feedingTransactionReducer(
  state: FeedingTransactionState = initialState,
  action: Action
): FeedingTransactionState {
  switch (action.type) {
    case FeedingTranscationActionTypes.SelectFeedTransaction:
      return {
        ...state,
        selectedId: (<SelectFeedTransactionAction>action).transactionId
      };
    default:
      return {
        ...state,
        ...crudReducer(
          FeedingTransactionKey,
          feedingTransactionAdapter,
          state,
          action
        )
      };
  }
}
