import {
  FeedingTransaction,
  SaveState
} from '@core/models';
import {
  animalTransactionReducer,
  FeedingTransactionState
} from '@core/store';
import { environment } from '@env/environment';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { FeedStoreConstants } from './constants';

export const feedingTransactionAdapter =
  createEntityAdapter<FeedingTransaction>({
    selectId: (transaction: FeedingTransaction) => transaction.id,
    sortComparer: (transaction: FeedingTransaction) =>
      transaction.transactionDate.valueOf()
  });

export const initialState: FeedingTransactionState = {
  ...feedingTransactionAdapter.getInitialState(),
  isFetching: false,
  isPending: false,
  error: null,
  selectedId: null,
  pageNumber: 0,
  pageSize: environment.pageSize,
  recordCount: 0,
  saveState: SaveState.New
};

export function feedingTransactionReducer(
  state: FeedingTransactionState = initialState,
  action: Action
): FeedingTransactionState {
  return animalTransactionReducer(
    FeedStoreConstants.Transactions.ActionKey,
    feedingTransactionAdapter,
    state,
    action
  );
}
