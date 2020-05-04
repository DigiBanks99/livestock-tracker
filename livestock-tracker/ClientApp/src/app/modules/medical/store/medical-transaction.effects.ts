import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MedicalTransaction } from '@core/models';
import { PagedData } from '@core/models/paged-data.model';
import { CrudEffects } from '@core/store/crud.effects';
import { MedicalTransactionService } from '@medical/services/medical-transaction.service';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { MedicalStoreConstants } from './constants';
import {
  actions,
  FetchMedicalTransaction as FetchMedicalTransactions,
  FetchSingleMedicalTransactionParams
} from './medical-transaction.actions';

@Injectable()
export class MedicalTransactionEffects extends CrudEffects<
  MedicalTransaction,
  number,
  FetchSingleMedicalTransactionParams
> {
  constructor(
    actions$: Actions,
    private medicalTransactionService: MedicalTransactionService
  ) {
    super(
      actions$,
      medicalTransactionService,
      actions,
      MedicalStoreConstants.MedicalTransactionKey
    );
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<MedicalTransaction>> => {
    const fetchAction = <FetchMedicalTransactions>action;
    return this.medicalTransactionService.getAll(
      fetchAction.animalId,
      fetchAction.pageNumber,
      fetchAction.pageSize
    );
  };
}
