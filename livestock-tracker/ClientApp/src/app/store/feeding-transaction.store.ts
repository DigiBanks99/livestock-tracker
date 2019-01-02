import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FeedingTransactionState,
  feedingTransactionAdapter
} from './feeding-transaction.reducer';

const getFeedingTransactionState = createFeatureSelector<
  FeedingTransactionState
>('feedingTransactions');

const {
  selectAll: getAllFeedingTransactions,
  selectEntities: getAllFeedingTransactionEntities,
  selectTotal: getFeedingTransactionCount
} = feedingTransactionAdapter.getSelectors(getFeedingTransactionState);

const getSelectedFeedingTransactionId = createSelector(
  getFeedingTransactionState,
  state => {
    return state.selectedTransactionId;
  }
);

const getSelectedFeedingTransaction = createSelector(
  getAllFeedingTransactionEntities,
  getSelectedFeedingTransactionId,
  (entities, id) => {
    return entities[id];
  }
);

const getFeedingTransactionPendingState = createSelector(
  getFeedingTransactionState,
  state => state.isPending
);

const getFeedingTransactionErrorState = createSelector(
  getFeedingTransactionState,
  state => state.error
);

export const selectors = {
  getAllFeedingTransactions,
  getAllFeedingTransactionEntities,
  getFeedingTransactionCount,
  getFeedingTransactionErrorState,
  getFeedingTransactionPendingState,
  getSelectedFeedingTransactionId,
  getSelectedFeedingTransaction
};
