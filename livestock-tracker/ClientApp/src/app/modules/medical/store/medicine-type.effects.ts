import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicineType } from '@core/models';
import { PagedData } from '@core/models/paged-data.model';
import { CrudEffects } from '@core/store/crud.effects';
import { MedicineTypeService } from '@medical/services/medicine-type.service';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { MedicalStoreConstants } from './constants';
import { actions, FetchMedicineTypes } from './medicine-type.actions';

@Injectable()
export class MedicineTypeEffects extends CrudEffects<
  MedicineType,
  number,
  number
> {
  constructor(
    actions$: Actions,
    private medicineTypeService: MedicineTypeService,
    snackBar: MatSnackBar
  ) {
    super(
      actions$,
      medicineTypeService,
      actions,
      MedicalStoreConstants.MedicineTypeKey,
      snackBar
    );
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<MedicineType>> => {
    const fetchAction = <FetchMedicineTypes>action;
    return this.medicineTypeService.getAll(
      fetchAction.pageNumber,
      fetchAction.pageSize,
      fetchAction.includeDeleted
    );
  };
}
