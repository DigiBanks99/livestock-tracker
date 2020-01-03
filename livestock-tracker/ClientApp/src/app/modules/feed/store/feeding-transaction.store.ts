import { FeedingTransactionState } from '@core/store';
import { feedingTransactionAdapter } from '@feed/store/feeding-transaction.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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
    return state.selectedId;
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
