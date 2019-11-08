import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';

export enum ActionTypes {
  ADD_FEED_TRANSACTION = 'ADD_FEED_TRANSACTION',
  ADD_FEED_TRANSACTION_SUCCESS = 'ADD_FEED_TRANSACTION_SUCCESS',
  UPDATE_FEED_TRANSACTION = 'UPDATE_FEED_TRANSACTION',
  UPDATE_FEED_TRANSACTION_SUCCESS = 'UPDATE_FEED_TRANSACTION_SUCCESS',
  REMOVE_FEED_TRANSACTION = 'REMOVE_FEED_TRANSACTION',
  REMOVE_FEED_TRANSACTION_SUCCESS = 'REMOVE_FEED_TRANSACTION_SUCCESS',
  FETCH_FEED_TRANSACTIONS = 'FETCH_FEED_TRANSACTIONS',
  SET_FEED_TRANSACTIONS = 'SET_FEED_TRANSACTIONS',
  SELECT_FEED_TRANSACTION = 'SELECT_FEED_TRANSACTION',
  FEED_TRANSACTION_ERROR = 'FEED_TRANSACTION_ERROR'
}

export class AddFeedTransaction implements Action {
  readonly type = ActionTypes.ADD_FEED_TRANSACTION;
  transaction: FeedingTransaction;

  constructor(transaction: FeedingTransaction) {
    this.transaction = transaction;
  }
}

export class AddFeedTransactionSucceeded implements Action {
  readonly type = ActionTypes.ADD_FEED_TRANSACTION_SUCCESS;
  transaction: FeedingTransaction;

  constructor(transaction: FeedingTransaction) {
    this.transaction = transaction;
  }
}

export class UpdateFeedTransaction implements Action {
  readonly type = ActionTypes.UPDATE_FEED_TRANSACTION;
  transaction: FeedingTransaction;

  constructor(transaction: FeedingTransaction) {
    this.transaction = transaction;
  }
}

export class UpdateFeedTransactionSucceeded implements Action {
  readonly type = ActionTypes.UPDATE_FEED_TRANSACTION_SUCCESS;
  transaction: Update<FeedingTransaction>;

  constructor(transaction: Update<FeedingTransaction>) {
    this.transaction = transaction;
  }
}

export class RemoveFeedTransaction implements Action {
  readonly type = ActionTypes.REMOVE_FEED_TRANSACTION;
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class RemoveFeedTransactionSucceeded implements Action {
  readonly type = ActionTypes.REMOVE_FEED_TRANSACTION_SUCCESS;
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class FetchFeedingTransactions implements Action {
  readonly type = ActionTypes.FETCH_FEED_TRANSACTIONS;
  animalId: number;

  constructor(animalId: number) {
    this.animalId = animalId;
  }
}

export class SetFeedTransactions implements Action {
  readonly type = ActionTypes.SET_FEED_TRANSACTIONS;
  transactions: FeedingTransaction[];

  constructor(transactions: FeedingTransaction[]) {
    this.transactions = transactions;
  }
}

export class SelectFeedTransaction implements Action {
  readonly type = ActionTypes.SELECT_FEED_TRANSACTION;
  transactionId: number;

  constructor(transactionId: number) {
    this.transactionId = transactionId;
  }
}

export class FeedTransactionError implements Action {
  readonly type = ActionTypes.FEED_TRANSACTION_ERROR;
  error: Error;

  constructor(error: Error) {
    this.error = error;
  }
}
