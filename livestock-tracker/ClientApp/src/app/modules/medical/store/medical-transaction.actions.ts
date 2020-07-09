import { MedicalTransaction } from '@core/models';
import { crudActionsFactory, PayloadAction } from '@core/store';
import { Action } from '@ngrx/store';

import { MedicalStoreConstants } from './constants';

export enum ActionTypes {
  FETCH_MEDICAL_TRANSACTIONS = 'FETCH_MEDICAL_TRANSACTION',
  FETCH_SINGLE_MEDICAL_TRANSACTION = 'FETCH_SINGLE_MEDICAL_TRANSACTION',
}

export interface FetchSingleMedicalTransactionParams {
  animalId: number;
  id: number;
}

export class FetchMedicalTransactions implements Action {
  readonly type = ActionTypes.FETCH_MEDICAL_TRANSACTIONS;
  animalId: number;
  pageNumber: number;
  pageSize: number;

  constructor(animalId = 0, pageNumber: number = 0, pageSize: number = 10) {
    this.animalId = animalId;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}

export class FetchSingleMedicalTransaction
  implements PayloadAction<FetchSingleMedicalTransactionParams> {
  readonly type = ActionTypes.FETCH_SINGLE_MEDICAL_TRANSACTION;
  payload: FetchSingleMedicalTransactionParams;

  constructor(animalId: number, id: number) {
    this.payload = {
      animalId,
      id,
    };
  }
}

export const actions = crudActionsFactory<MedicalTransaction, number>(
  MedicalStoreConstants.MedicalTransactionKey
);
