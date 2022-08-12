import {
  FeedingTransaction,
  SaveState
} from '@core/models';
import { FeedingTransactionState } from '@core/store';
import { getSelectedAnimalId } from '@core/store/selectors';
import { environment } from '@env/environment';
import { FeedStoreConstants } from '@feed/store/constants';
import { feedingTransactionAdapter } from '@feed/store/feeding-transaction.reducer';
import { Dictionary } from '@ngrx/entity';
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

const feedingTransactionState = createFeatureSelector<FeedingTransactionState>(
  FeedStoreConstants.Transactions.StoreKey
);

export const {
  selectEntities: feedingTransactionEntities,
  selectIds: feedingTransactionIds,
  selectTotal: feedingTransactionCount
} = feedingTransactionAdapter.getSelectors(feedingTransactionState);

export const allFeedingTransactions = createSelector(
  feedingTransactionEntities,
  feedingTransactionIds,
  (entities: Dictionary<FeedingTransaction>, ids: (string | number)[]) =>
    ids
      .map((id: string | number) => entities[id] ?? [])
      .filter(
        (transaction): transaction is FeedingTransaction => transaction !== null
      )
);

export const feedingTransactionsForAnimal = createSelector(
  allFeedingTransactions,
  getSelectedAnimalId,
  (
    transactions: FeedingTransaction[],
    animalId: number
  ): FeedingTransaction[] =>
    transactions.filter(
      (transaction: FeedingTransaction) => transaction.animalId === animalId
    )
);

export const selectedFeedingTransactionId = createSelector(
  feedingTransactionState,
  (state: FeedingTransactionState) => state?.selectedId ?? null
);

export const selectedFeedingTransaction = createSelector(
  feedingTransactionState,
  (state: FeedingTransactionState) => state?.entities[state?.selectedId] ?? null
);

export const isFetching = createSelector(
  feedingTransactionState,
  (state: FeedingTransactionState): boolean => state?.isFetching ?? false
);

export const isPendingTransaction = createSelector(
  feedingTransactionState,
  (state: FeedingTransactionState): boolean => state?.isPending ?? false
);

export const saveState = createSelector(
  feedingTransactionState,
  (state: FeedingTransactionState): SaveState =>
    state?.saveState ?? SaveState.New
);

export const error = createSelector(
  feedingTransactionState,
  (state: FeedingTransactionState): Error => state?.error ?? null
);

export const pageSize = createSelector(
  feedingTransactionState,
  (state: FeedingTransactionState): number =>
    state?.pageSize ?? environment.pageSize
);

export const currentPage = createSelector(
  feedingTransactionState,
  (state: FeedingTransactionState): number => state?.pageNumber ?? 0
);

export const recordCount = createSelector(
  feedingTransactionState,
  (state: FeedingTransactionState): number => state?.recordCount ?? 0
);
