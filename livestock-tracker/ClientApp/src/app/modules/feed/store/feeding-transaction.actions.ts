import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { crudActionsFactory, PayloadAction } from '@core/store';
import { Action } from '@ngrx/store';

import { FeedingTransactionKey } from './constants';

export enum ActionTypes {
  SELECT_FEED_TRANSACTION = 'SELECT_FEED_TRANSACTION',
  FETCH_SINGLE_FEED_TRANSACTION = 'FETCH_SINGLE_FEED_TRANSACTION',
}

export interface FetchSingleFeedTransactionParams {
  animalId: number;
  id: number;
}

export class SelectFeedTransaction implements Action {
  readonly type = ActionTypes.SELECT_FEED_TRANSACTION;
  transactionId: number;

  constructor(transactionId: number) {
    this.transactionId = transactionId;
  }
}

export class FetchSingleFeedTransaction
  implements PayloadAction<FetchSingleFeedTransactionParams> {
  readonly type = ActionTypes.FETCH_SINGLE_FEED_TRANSACTION;
  payload: FetchSingleFeedTransactionParams;

  constructor(private animalId: number, private id: number) {
    this.payload = {
      animalId,
      id,
    };
  }
}

export const actions = crudActionsFactory<FeedingTransaction, number>(
  FeedingTransactionKey
);
