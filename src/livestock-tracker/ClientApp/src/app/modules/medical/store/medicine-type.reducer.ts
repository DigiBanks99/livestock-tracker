import { MedicineType, SaveState } from '@core/models';
import { crudReducer, MedicineTypeState } from '@core/store';
import { environment } from '@env/environment';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { MedicalStoreConstants } from './constants';

export const medicineTypeAdapter = createEntityAdapter<MedicineType>({
  selectId: (medicineType: MedicineType) => medicineType.id,
  sortComparer: (left: MedicineType, right: MedicineType) =>
    left.description.localeCompare(right.description)
});

const initialState: MedicineTypeState = {
  ...medicineTypeAdapter.getInitialState(),
  isFetching: false,
  isPending: false,
  error: null,
  selectedId: null,
  pageNumber: 0,
  pageSize: environment.pageSize,
  recordCount: 0,
  saveState: SaveState.New
};

export function medicineTypeReducer(
  state: MedicineTypeState = initialState,
  action: Action
) {
  switch (action.type) {
    default:
      return {
        ...state,
        ...crudReducer(
          MedicalStoreConstants.Medicine.ActionKey,
          medicineTypeAdapter,
          state,
          action
        )
      };
  }
}
