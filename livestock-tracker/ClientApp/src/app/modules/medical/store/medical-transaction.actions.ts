import { MedicalTransaction } from '@core/models';
import { crudActionsFactory, PayloadAction } from '@core/store';
import { Action } from '@ngrx/store';

import { MedicalStoreConstants } from './constants';

export enum MedicalActionTypes {
  FetchMedicalTransactions = 'FETCH_MEDICAL_TRANSACTION',
  FetchSingleMedicalTransaction = 'FETCH_SINGLE_MEDICAL_TRANSACTION'
}

export interface FetchSingleMedicalTransactionParams {
  animalId: number;
  id: number;
}

export class FetchMedicalTransactionsAction implements Action {
  readonly type = MedicalActionTypes.FetchMedicalTransactions;
  animalId: number;
  pageNumber: number;
  pageSize: number;

  constructor(animalId = 0, pageNumber: number = 0, pageSize: number = 10) {
    this.animalId = animalId;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}

export class FetchSingleMedicalTransactionAction
  implements PayloadAction<FetchSingleMedicalTransactionParams> {
  readonly type = MedicalActionTypes.FetchSingleMedicalTransaction;
  payload: FetchSingleMedicalTransactionParams;

  constructor(animalId: number, id: number) {
    this.payload = {
      animalId,
      id
    };
  }
}

export const actions = crudActionsFactory<MedicalTransaction, number>(
  MedicalStoreConstants.MedicalTransactionKey
);
