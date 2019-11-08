import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Action } from '@ngrx/store';
import {
  ActionTypes,
  AddFeedTransactionSucceeded,
  RemoveFeedTransactionSucceeded,
  UpdateFeedTransactionSucceeded,
  SetFeedTransactions,
  SelectFeedTransaction,
  FeedTransactionError
} from '@feeding-transaction-store/actions';

export const feedingTransactionAdapter = createEntityAdapter<
  FeedingTransaction
>({
  selectId: (transaction: FeedingTransaction) => transaction.id,
  sortComparer: false
});

export interface FeedingTransactionState
  extends EntityState<FeedingTransaction> {
  selectedTransactionId: number;
  isPending: boolean;
  error?: Error;
}

export const initialState: FeedingTransactionState = feedingTransactionAdapter.getInitialState(
  {
    selectedTransactionId: null,
    isPending: false,
    error: null
  }
);

export function feedingTransactionReducer(
  state: FeedingTransactionState = initialState,
  action: Action
) {
  switch (action.type) {
    case ActionTypes.FETCH_FEED_TRANSACTIONS:
    case ActionTypes.ADD_FEED_TRANSACTION:
    case ActionTypes.UPDATE_FEED_TRANSACTION:
    case ActionTypes.REMOVE_FEED_TRANSACTION:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case ActionTypes.ADD_FEED_TRANSACTION_SUCCESS:
      return {
        ...feedingTransactionAdapter.addOne(
          (<AddFeedTransactionSucceeded>action).transaction,
          { ...state }
        ),
        isPending: false,
        error: null
      };
    case ActionTypes.REMOVE_FEED_TRANSACTION_SUCCESS:
      return {
        ...feedingTransactionAdapter.removeOne(
          (<RemoveFeedTransactionSucceeded>action).id,
          { ...state }
        ),
        isPending: false,
        error: null
      };
    case ActionTypes.UPDATE_FEED_TRANSACTION_SUCCESS:
      return {
        ...feedingTransactionAdapter.updateOne(
          (<UpdateFeedTransactionSucceeded>action).transaction,
          { ...state }
        ),
        isPending: false,
        error: null
      };
    case ActionTypes.SET_FEED_TRANSACTIONS:
      const setFeedTransactionsAction = <SetFeedTransactions>action;
      const newState = feedingTransactionAdapter.addAll(
        setFeedTransactionsAction.transactions,
        { ...state }
      );
      return {
        ...newState,
        isPending: false,
        error: null
      };
    case ActionTypes.SELECT_FEED_TRANSACTION:
      return {
        ...state,
        selectedTransactionId: (<SelectFeedTransaction>action).transactionId
      };
    case ActionTypes.FEED_TRANSACTION_ERROR:
      return {
        ...state,
        isPending: false,
        error: (<FeedTransactionError>action).error
      };
    default:
      return state;
  }
}
