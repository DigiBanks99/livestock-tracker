import { FeedingTransactionState } from '@core/store';
import { feedingTransactionAdapter } from '@feed/store/feeding-transaction.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getFeedingTransactionState = createFeatureSelector<
  FeedingTransactionState
>('feedingTransactions');

const {
  selectAll: getAllFeedingTransactions,
  selectEntities: getAllFeedingTransactionEntities,
  selectTotal: getFeedingTransactionCount,
} = feedingTransactionAdapter.getSelectors(getFeedingTransactionState);

const getSelectedFeedingTransactionId = createSelector(
  getFeedingTransactionState,
  (state) => {
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
  (state) => state.isPending
);

const getPageSize = createSelector(
  getFeedingTransactionState,
  (state) => state.pageSize
);

const getCurrentPage = createSelector(
  getFeedingTransactionState,
  (state) => state.pageNumber
);

const getRecordCount = createSelector(
  getFeedingTransactionState,
  (state) => state.recordCount
);

const getFeedingTransactionErrorState = createSelector(
  getFeedingTransactionState,
  (state) => state.error
);

export const selectors = {
  getFeedingTransactionState,
  getAllFeedingTransactions,
  getAllFeedingTransactionEntities,
  getFeedingTransactionCount,
  getFeedingTransactionErrorState,
  getFeedingTransactionPendingState,
  getSelectedFeedingTransactionId,
  getSelectedFeedingTransaction,
  getPageSize,
  getCurrentPage,
  getRecordCount,
};
