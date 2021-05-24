import { MedicalTransaction, SaveState } from '@core/models';
import { crudReducer, MedicalTransactionState } from '@core/store';
import { environment } from '@env/environment';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { MedicalStoreConstants } from './constants';

export const medicalTransactionAdapter = createEntityAdapter<
  MedicalTransaction
>({
  selectId: (medicalTransaction: MedicalTransaction) => medicalTransaction.id,
  sortComparer: (medicalTransaction: MedicalTransaction) =>
    medicalTransaction.transactionDate.valueOf()
});

const initialState: MedicalTransactionState = {
  ...medicalTransactionAdapter.getInitialState(),
  isFetching: false,
  isPending: false,
  error: null,
  selectedId: null,
  pageNumber: 0,
  pageSize: environment.pageSize,
  recordCount: 0,
  saveState: SaveState.New
};

export function medicalTransactionReducer(
  state: MedicalTransactionState = initialState,
  action: Action
) {
  switch (action.type) {
    default:
      return {
        ...state,
        ...crudReducer(
          MedicalStoreConstants.MedicalTransactionKey,
          medicalTransactionAdapter,
          state,
          action
        )
      };
  }
}
