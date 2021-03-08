import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicalTransaction } from '@core/models';
import { PagedData } from '@core/models/paged-data.model';
import { CrudEffects } from '@core/store/crud.effects';
import { MedicalTransactionService } from '@medical/services';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { MedicalStoreConstants } from './constants';
import {
  actions,
  FetchMedicalTransactionsAction,
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
    private medicalTransactionService: MedicalTransactionService,
    snackBar: MatSnackBar
  ) {
    super(
      actions$,
      medicalTransactionService,
      actions,
      MedicalStoreConstants.MedicalTransactionKey,
      snackBar
    );
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<MedicalTransaction>> => {
    const fetchAction = <FetchMedicalTransactionsAction>action;
    return this.medicalTransactionService.getAll(
      fetchAction.animalId,
      fetchAction.pageNumber,
      fetchAction.pageSize
    );
  };
}
