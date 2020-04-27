import { NumberValueAccessor } from '@angular/forms';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { crudActionsFactory, PayloadAction } from '@core/store';
import { Action } from '@ngrx/store';

import { FeedingTransactionKey } from './constants';

export enum ActionTypes {
  SELECT_FEED_TRANSACTION = 'SELECT_FEED_TRANSACTION',
  FETCH_SINGLE_FEED_TRANSACTION = 'FETCH_SINGLE_FEED_TRANSACTION',
  FETCH_FEED_TRANSACTION = 'FETCH_FEED_TRANSACTION',
  API_FETCH_FEED_TRANSACTION = 'API_FETCH_FEED_TRANSACTION',
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

  constructor(animalId: number, id: number) {
    this.payload = {
      animalId,
      id,
    };
  }
}

export class FetchFeedingTransaction implements Action {
  readonly type = ActionTypes.FETCH_FEED_TRANSACTION;

  constructor(
    public animalId: number,
    public pageNumber: number,
    public pageSize: number
  ) {}
}

export const actions = crudActionsFactory<FeedingTransaction, number>(
  FeedingTransactionKey
);
