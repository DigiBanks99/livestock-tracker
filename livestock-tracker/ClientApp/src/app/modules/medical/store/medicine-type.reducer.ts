import { MedicineType } from '@core/models';
import { crudReducer } from '@core/store/crud.reducer';
import { MedicineTypeState } from '@core/store/medicine-type-state.interface';
import { environment } from '@env/environment';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { MedicalStoreConstants } from './constants';

export const medicineTypeAdapter = createEntityAdapter<MedicineType>({
  selectId: (medicineType: MedicineType) => medicineType.id,
  sortComparer: (medicineType: MedicineType) => medicineType.description,
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
          MedicalStoreConstants.MedicineTypeKey,
          medicineTypeAdapter,
          state,
          action
        ),
      };
  }
}
