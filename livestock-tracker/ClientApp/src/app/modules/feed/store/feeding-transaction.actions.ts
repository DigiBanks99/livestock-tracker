import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { crudActionsFactory } from '@core/store';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { FeedingTransactionKey } from './constants';

export enum ActionTypes {
  SELECT_FEED_TRANSACTION = 'SELECT_FEED_TRANSACTION'
}

export class SelectFeedTransaction implements Action {
  readonly type = ActionTypes.SELECT_FEED_TRANSACTION;
  transactionId: number;

  constructor(transactionId: number) {
    this.transactionId = transactionId;
  }
}

export const actions = crudActionsFactory<FeedingTransaction, number>(
  FeedingTransactionKey
);
