import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { crudActionsFactory, PayloadAction } from '@core/store';
import { Action } from '@ngrx/store';

import { FeedingTransactionKey } from './constants';

export enum FeedingTranscationActionTypes {
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
  readonly type = FeedingTranscationActionTypes.SelectFeedTransaction;
  transactionId: number;

  constructor(transactionId: number) {
    this.transactionId = transactionId;
  }
}

export class FetchSingleFeedTransactionAction
  implements PayloadAction<FetchSingleFeedTransactionParams> {
  readonly type = FeedingTranscationActionTypes.FetchSingleFeedTransaction;
  payload: FetchSingleFeedTransactionParams;

  constructor(animalId: number, id: number) {
    this.payload = {
      animalId,
      id
    };
  }
}

export class FetchFeedingTransactionAction implements Action {
  readonly type = FeedingTranscationActionTypes.FetchFeedTransaction;

  constructor(
    public animalId: number,
    public pageNumber: number,
    public pageSize: number
  ) {}
}

export const actions = crudActionsFactory<FeedingTransaction, number>(
  FeedingTransactionKey
);
