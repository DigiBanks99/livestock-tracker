import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagedData } from '@core/models/paged-data.model';
import { Unit } from '@core/models/unit.model';
import { CrudEffects } from '@core/store/crud.effects';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UnitService } from '@unit/services/unit.service';
import { actions, FetchUnits } from '@unit/store/unit.actions';

import { UnitKey } from './constants';

@Injectable()
export class UnitEffects extends CrudEffects<Unit, number, number> {
  constructor(
    protected actions$: Actions,
    private unitService: UnitService,
    snackBar: MatSnackBar
  ) {
    super(actions$, unitService, actions, UnitKey, snackBar);
  }

  protected get defaultFetchAction(): Action {
    return new FetchUnits();
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<Unit>> => {
    const fetchAction = <FetchUnits>action;
    return this.unitService.getAll(
      fetchAction.pageNumber,
      fetchAction.pageSize,
      fetchAction.includeDeleted
    );
  };
}
