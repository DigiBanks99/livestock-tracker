import { SaveState } from '@core/models';
import { PaginationState } from '@core/store';
import { getSelectedAnimalId } from '@core/store/selectors';
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import {
  WeightState,
  WeightTransaction
} from '@weight/interfaces';

import { weightTransactionAdapter } from './weight.adapter';
import { Constants } from './weight.constants';

const weightState = createFeatureSelector<WeightState>(Constants.StoreKey);

export const {
  selectAll: allWeightTransactions,
  selectEntities: getAllWeightTransactionEntities,
  selectTotal: getWeightTransactionCount
} = weightTransactionAdapter.getSelectors(weightState);

export const weightTransactionsForAnimal = createSelector(
  allWeightTransactions,
  getSelectedAnimalId,
  (transactions: WeightTransaction[], animalId: number): WeightTransaction[] =>
    transactions.filter(
      (transaction: WeightTransaction) => transaction.animalId === animalId
    )
);

export const error = createSelector(
  weightState,
  (state: WeightState): Error => state.error
);

export const isFetching = createSelector(
  weightState,
  (state: WeightState): boolean => state.isPending
);

export const isPending = createSelector(
  weightState,
  (state: WeightState): boolean => state.isPending
);

export const saveState = createSelector(
  weightState,
  (state: WeightState): SaveState => state.saveState
);

export const selectedWeightTransaction = createSelector(
  weightState,
  (state: WeightState): WeightTransaction => state.entities[state.selectedId]
);

export const paginationData = createSelector(
  weightState,
  (state: WeightState): PaginationState => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    recordCount: state.recordCount
  })
);

export const pageSize = createSelector(
  paginationData,
  (state: PaginationState) => state.pageSize
);

export const currentPage = createSelector(
  paginationData,
  (state: PaginationState) => state.pageNumber
);

export const recordCount = createSelector(
  paginationData,
  (state: PaginationState) => state.recordCount
);
