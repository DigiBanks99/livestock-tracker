import { MedicalTransaction } from '@core/models';
import {
  fetchAnimalTransactionsActionFactory,
  PayloadAction
} from '@core/store';

import { MedicalStoreConstants } from './constants';

export enum MedicalActionTypes {
  FetchMedicalTransactions = 'FETCH_MEDICAL_TRANSACTION',
  FetchSingleMedicalTransaction = 'FETCH_SINGLE_MEDICAL_TRANSACTION'
}

export interface FetchSingleMedicalTransactionParams {
  animalId: number;
  id: number;
}

export class FetchSingleMedicalTransactionAction
  implements PayloadAction<FetchSingleMedicalTransactionParams>
{
  readonly type = MedicalActionTypes.FetchSingleMedicalTransaction;
  payload: FetchSingleMedicalTransactionParams;

  constructor(animalId: number, id: number) {
    this.payload = {
      animalId,
      id
    };
  }
}

export const actions = {
  ...fetchAnimalTransactionsActionFactory<MedicalTransaction>(
    MedicalStoreConstants.Transactions.ActionKey
  )
};
