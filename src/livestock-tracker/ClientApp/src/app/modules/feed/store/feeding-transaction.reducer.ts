import { FeedingTransaction, SaveState } from '@core/models';
import { crudReducer, FeedingTransactionState } from '@core/store';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { FeedingTransactionKey } from './constants';
import {
  FeedingTranscationActionTypes,
  SelectFeedTransactionAction
} from './feeding-transaction.actions';

export const feedingTransactionAdapter =
  createEntityAdapter<FeedingTransaction>({
    selectId: (transaction: FeedingTransaction) => transaction.id,
    sortComparer: false
  });

export const initialState: FeedingTransactionState =
  feedingTransactionAdapter.getInitialState({
    selectedId: null,
    isPending: false,
    isFetching: false,
    error: null,
    pageNumber: 0,
    pageSize: 10,
    recordCount: 0,
    saveState: SaveState.New
  });

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
