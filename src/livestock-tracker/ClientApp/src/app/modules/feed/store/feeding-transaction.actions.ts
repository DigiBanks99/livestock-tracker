import { FeedingTransaction } from '@core/models';
import {
  fetchAnimalTransactionsActionFactory,
  PayloadAction
} from '@core/store';
import { Action } from '@ngrx/store';

import { FeedStoreConstants } from './constants';

export enum FeedingTransactionActionTypes {
  SelectFeedTransaction = 'SELECT_FEED_TRANSACTION',
  FetchSingleFeedTransaction = 'FETCH_SINGLE_FEED_TRANSACTION',
  FetchFeedTransaction = 'FETCH_FEED_TRANSACTION',
  FetchFeedTransactionSucceeded = 'API_FETCH_FEED_TRANSACTION'
}

export interface FetchSingleFeedTransactionParams {
  animalId: number;
  id: number;
}

export class SelectFeedTransactionAction implements Action {
  readonly type = FeedingTransactionActionTypes.SelectFeedTransaction;
  transactionId: number;

  constructor(transactionId: number) {
    this.transactionId = transactionId;
  }
}

export class FetchSingleFeedTransactionAction
  implements PayloadAction<FetchSingleFeedTransactionParams>
{
  readonly type = FeedingTransactionActionTypes.FetchSingleFeedTransaction;
  payload: FetchSingleFeedTransactionParams;

  constructor(animalId: number, id: number) {
    this.payload = {
      animalId,
      id
    };
  }
}

export class FetchFeedingTransactionAction implements Action {
  readonly type = FeedingTransactionActionTypes.FetchFeedTransaction;

  constructor(
    public animalId: number,
    public pageNumber: number,
    public pageSize: number
  ) {}
}

export const actions = {
  ...fetchAnimalTransactionsActionFactory<FeedingTransaction>(
    FeedStoreConstants.Transactions.ActionKey
  )
};
