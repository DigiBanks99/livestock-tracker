import { MedicineType } from '@core/models';
import { MedicineTypeState } from '@core/store/medicine-type-state.interface';
import { Dictionary } from '@ngrx/entity';
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { MedicalStoreConstants } from './constants';
import { medicineTypeAdapter } from './medicine-type.reducer';

const medicineTypeState = createFeatureSelector<MedicineTypeState>(
  MedicalStoreConstants.Medicine.StoreKey
);

export const {
  selectEntities: medicineTypeEntities,
  selectIds: medicineTypeIds,
  selectTotal: medicineTypeCount
} = medicineTypeAdapter.getSelectors(medicineTypeState);

export const medicineTypes = createSelector(
  medicineTypeEntities,
  medicineTypeIds,
  (entities: Dictionary<MedicineType>, ids: (string | number)[]) =>
    ids
      .map((id: string | number) => entities[id])
      .filter(
        (medicineType): medicineType is MedicineType => medicineType !== null
      )
);

export const selectedMedicineTypeId = createSelector(
  medicineTypeState,
  (state: MedicineTypeState) => state.selectedId
);

export const selectedMedicineType = createSelector(
  medicineTypeEntities,
  selectedMedicineTypeId,
  (entities: Dictionary<MedicineType>, id: number) => entities[id]
);

export const isPending = createSelector(
  medicineTypeState,
  (state: MedicineTypeState) => state.isPending
);

export const error = createSelector(
  medicineTypeState,
  (state: MedicineTypeState) => state.error
);

export const pageSize = createSelector(
  medicineTypeState,
  (state: MedicineTypeState) => state.pageSize
);

export const currentPage = createSelector(
  medicineTypeState,
  (state: MedicineTypeState) => state.pageNumber
);

export const recordCount = createSelector(
  medicineTypeState,
  (state: MedicineTypeState) => state.recordCount
);
