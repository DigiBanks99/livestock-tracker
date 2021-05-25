import { MedicineType } from '@core/models';
import { MedicineTypeState } from '@core/store/medicine-type-state.interface';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MedicalStoreConstants } from './constants';
import { medicineTypeAdapter } from './medicine-type.reducer';

const getMedicineTypeState = createFeatureSelector<MedicineTypeState>(
  MedicalStoreConstants.MedicineTypeStoreKey
);

const {
  selectEntities: getMedicineTypeEntities,
  selectIds: getMedicineTypeIds,
  selectTotal: getMedicineTypeCount,
} = medicineTypeAdapter.getSelectors(getMedicineTypeState);

const getMedicineTypes = createSelector(
  getMedicineTypeEntities,
  getMedicineTypeIds,
  (entities: Dictionary<MedicineType>, ids: (string | number)[]) =>
    ids
      .map((id: string | number) => entities[id])
      .filter(
        (medicineType): medicineType is MedicineType => medicineType !== null
      )
);

const getSelectedMedicineTypeId = createSelector(
  getMedicineTypeState,
  (state: MedicineTypeState) => state.selectedId
);

const getSelectedMedicineType = createSelector(
  getMedicineTypeEntities,
  getSelectedMedicineTypeId,
  (entities: Dictionary<MedicineType>, id: number) => entities[id]
);

const getPending = createSelector(
  getMedicineTypeState,
  (state: MedicineTypeState) => state.isPending
);

const getError = createSelector(
  getMedicineTypeState,
  (state: MedicineTypeState) => state.error
);

const getPageSize = createSelector(
  getMedicineTypeState,
  (state: MedicineTypeState) => state.pageSize
);

const getCurrentPage = createSelector(
  getMedicineTypeState,
  (state: MedicineTypeState) => state.pageNumber
);

const getRecordCount = createSelector(
  getMedicineTypeState,
  (state: MedicineTypeState) => state.recordCount
);

export const selectors = {
  getMedicineTypeCount,
  getMedicineTypeEntities,
  getMedicineTypeIds,
  getMedicineTypes,
  getSelectedMedicineTypeId,
  getSelectedMedicineType,
  getPending,
  getError,
  getPageSize,
  getCurrentPage,
  getRecordCount,
};
