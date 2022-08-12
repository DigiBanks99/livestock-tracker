import {
  MedicalTransaction,
  SaveState
} from '@core/models';
import {
  MedicalTransactionState,
  PaginationState
} from '@core/store';
import { getSelectedAnimalId } from '@core/store/selectors';
import { Dictionary } from '@ngrx/entity';
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { MedicalStoreConstants } from './constants';
import { medicalTransactionAdapter } from './medical-transaction.reducer';

const medicalTransactionState = createFeatureSelector<MedicalTransactionState>(
  MedicalStoreConstants.Transactions.StoreKey
);

export const {
  selectEntities: medicalTransactionEntities,
  selectIds: medicalTransactionIds,
  selectTotal: medicalTransactionCount
} = medicalTransactionAdapter.getSelectors(medicalTransactionState);

export const allMedicalTransactions = createSelector(
  medicalTransactionEntities,
  medicalTransactionIds,
  (entities: Dictionary<MedicalTransaction>, ids: (string | number)[]) =>
    ids
      .map((id: string | number) => entities[id])
      .filter(
        (medicalTransaction): medicalTransaction is MedicalTransaction =>
          medicalTransaction !== null
      )
);

export const medicalTransactionsForAnimal = createSelector(
  allMedicalTransactions,
  getSelectedAnimalId,
  (
    transactions: MedicalTransaction[],
    animalId: number
  ): MedicalTransaction[] =>
    transactions.filter(
      (transaction: MedicalTransaction) => transaction.animalId === animalId
    )
);

export const selectedMedicalTransactionId = createSelector(
  medicalTransactionState,
  (state: MedicalTransactionState) => state.selectedId
);

export const selectedMedicalTransaction = createSelector(
  medicalTransactionState,
  (state: MedicalTransactionState) => state.entities[state.selectedId]
);

export const isFetching = createSelector(
  medicalTransactionState,
  (state: MedicalTransactionState): boolean => state.isFetching
);

export const isPendingTransactions = createSelector(
  medicalTransactionState,
  (state: MedicalTransactionState) => state.isPending
);

export const saveState = createSelector(
  medicalTransactionState,
  (state: MedicalTransactionState): SaveState => state.saveState
);

export const error = createSelector(
  medicalTransactionState,
  (state: MedicalTransactionState) => state.error
);

export const paginationData = createSelector(
  medicalTransactionState,
  (state: MedicalTransactionState): PaginationState => ({
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
