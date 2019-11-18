import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit } from '@core/models/unit.model';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UnitService } from '@unit/services/unit.service';
import {
  ActionTypes,
  AddUnit,
  AddUnitSuccess,
  FetchUnits,
  RemoveUnit,
  RemoveUnitSuccess,
  SetUnits,
  UnitError,
  UpdateUnit,
  UpdateUnitSuccess
} from '@unit/store/unit.actions';

@Injectable()
export class UnitEffects {
  constructor(private actions$: Actions, private unitService: UnitService) {}

  @Effect()
  getAll$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.FETCH_UNITS),
    startWith(new FetchUnits()),
    switchMap(_ => this.unitService.getUnits()),
    map((units: Unit[]) => new SetUnits(units)),
    catchError(handleError)
  );

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.ADD_UNIT),
    map((action: AddUnit) => action.unit),
    switchMap((unit: Unit) => this.unitService.addUnit(unit)),
    map((unit: Unit) => new AddUnitSuccess(unit)),
    catchError(handleError)
  );

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.REMOVE_UNIT),
    map((action: RemoveUnit) => action.typeCode),
    switchMap((typeCode: number) => this.unitService.deleteUnit(typeCode)),
    map((typeCode: number) => new RemoveUnitSuccess(typeCode)),
    catchError(handleError)
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_UNIT),
    map((action: UpdateUnit) => action.unit),
    switchMap((unit: Unit) => this.unitService.updateUnit(unit)),
    map(
      (unit: Unit) =>
        new UpdateUnitSuccess({ changes: unit, id: unit.typeCode })
    ),
    catchError(handleError)
  );
}

function handleError(err: any): Observable<UnitError> {
  let error: Error;
  if (err instanceof Error) error = err;
  else if (err instanceof HttpErrorResponse) {
    const httpError = <HttpErrorResponse>err;
    error = new Error(httpError.error);
    error.name = httpError.name;
    error.stack = httpError.url;
  } else error = new Error(err);

  return of(new UnitError(error));
}
