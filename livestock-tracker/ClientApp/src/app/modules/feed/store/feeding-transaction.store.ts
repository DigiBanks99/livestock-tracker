import { FeedingTransaction } from '@core/models';
import { FeedingTransactionState } from '@core/store';
import { feedingTransactionAdapter } from '@feed/store/feeding-transaction.reducer';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getFeedingTransactionState = createFeatureSelector<FeedingTransactionState>(
  'feedingTransactions'
);

const {
  selectAll: getAllFeedingTransactions,
  selectEntities: getAllFeedingTransactionEntities,
  selectTotal: getFeedingTransactionCount
} = feedingTransactionAdapter.getSelectors(getFeedingTransactionState);

const getSelectedFeedingTransactionId = createSelector(
  getFeedingTransactionState,
  (state: FeedingTransactionState): number => state.selectedId
);

const getSelectedFeedingTransaction = createSelector(
  getAllFeedingTransactionEntities,
  getSelectedFeedingTransactionId,
  (entities: Dictionary<FeedingTransaction>, id: number): FeedingTransaction =>
    entities[id]
);

const getFeedingTransactionPendingState = createSelector(
  getFeedingTransactionState,
  (state: FeedingTransactionState): boolean => state.isPending
);

const getPageSize = createSelector(
  getFeedingTransactionState,
  (state: FeedingTransactionState): number => state.pageSize
);

const getCurrentPage = createSelector(
  getFeedingTransactionState,
  (state: FeedingTransactionState): number => state.pageNumber
);

const getRecordCount = createSelector(
  getFeedingTransactionState,
  (state: FeedingTransactionState): number => state.recordCount
);

const getFeedingTransactionErrorState = createSelector(
  getFeedingTransactionState,
  (state: FeedingTransactionState): Error => state.error
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
  getRecordCount
};
