import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagedData, Unit } from '@core/models';
import { CrudEffects } from '@core/store';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UnitService } from '@unit/services/unit.service';

import { UnitKey } from './constants';
import { actions, FetchUnitsAction } from './unit.actions';

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
    return new FetchUnitsAction();
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<Unit>> => {
    const fetchAction = <FetchUnitsAction>action;
    return this.unitService.getAll(
      fetchAction.pageNumber,
      fetchAction.pageSize,
      fetchAction.includeDeleted
    );
  };
}
