import { MedicineType } from '@core/models';
import { crudActionsFactory } from '@core/store';
import { Action } from '@ngrx/store';

import { MedicalStoreConstants } from './constants';

export enum ActionTypes {
  FETCH_MEDICINE_TYPES = 'FETCH_MEDICINE_TYPE',
}

export class FetchMedicineTypes implements Action {
  readonly type = ActionTypes.FETCH_MEDICINE_TYPES;
  pageNumber: number;
  pageSize: number;
  includeDeleted: boolean;

  constructor(
    pageNumber: number = 0,
    pageSize: number = 10,
    includeDeleted = false
  ) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.includeDeleted = includeDeleted;
  }
}

export const actions = crudActionsFactory<MedicineType, number>(
  MedicalStoreConstants.MedicineTypeKey
);
