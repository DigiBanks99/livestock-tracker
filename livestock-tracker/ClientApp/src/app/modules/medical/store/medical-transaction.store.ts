import { MedicalTransaction } from '@core/models';
import { MedicalTransactionState } from '@core/store';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MedicalStoreConstants } from './constants';
import { medicalTransactionAdapter } from './medical-transaction.reducer';

const getMedicalTransactionState = createFeatureSelector<
  MedicalTransactionState
>(MedicalStoreConstants.MedicalTransactionStoreKey);

const {
  selectEntities: getMedicalTransactionEntities,
  selectIds: getMedicalTransactionIds,
  selectTotal: getMedicalTransactionCount,
} = medicalTransactionAdapter.getSelectors(getMedicalTransactionState);

const getMedicalTransactions = createSelector(
  getMedicalTransactionEntities,
  getMedicalTransactionIds,
  (entities: Dictionary<MedicalTransaction>, ids: (string | number)[]) =>
    ids
      .map((id: string | number) => entities[id])
      .filter(
        (medicalTransaction): medicalTransaction is MedicalTransaction =>
          medicalTransaction !== null
      )
);

const getSelectedMedicalTransactionId = createSelector(
  getMedicalTransactionState,
  (state: MedicalTransactionState) => state.selectedId
);

const getSelectedMedicalTransaction = createSelector(
  getMedicalTransactionEntities,
  getSelectedMedicalTransactionId,
  (entities: Dictionary<MedicalTransaction>, id: number) => {
    if (entities == null || id == null) {
      return {
        id: 0,
        animalId: 0,
        dose: null,
        transactionDate: new Date(),
        medicineId: null,
        unitId: null,
      };
    }
    return entities[id];
  }
);

const getPending = createSelector(
  getMedicalTransactionState,
  (state: MedicalTransactionState) => state.isPending
);

const getError = createSelector(
  getMedicalTransactionState,
  (state: MedicalTransactionState) => state.error
);

const getPageSize = createSelector(
  getMedicalTransactionState,
  (state: MedicalTransactionState) => state.pageSize
);

const getCurrentPage = createSelector(
  getMedicalTransactionState,
  (state: MedicalTransactionState) => state.pageNumber
);

const getRecordCount = createSelector(
  getMedicalTransactionState,
  (state: MedicalTransactionState) => state.recordCount
);

export const selectors = {
  getMedicalTransactionCount,
  getMedicalTransactionEntities,
  getMedicalTransactionIds,
  getMedicalTransactions,
  getSelectedMedicalTransactionId,
  getSelectedMedicalTransaction,
  getPending,
  getError,
  getPageSize,
  getCurrentPage,
  getRecordCount,
};
