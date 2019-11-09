import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { startWith, map, switchMap, catchError } from 'rxjs/operators';
import {
  UnitError,
  ActionTypes,
  FetchUnits,
  SetUnits,
  AddUnit,
  AddUnitSuccess,
  RemoveUnit,
  RemoveUnitSuccess,
  UpdateUnit,
  UpdateUnitSuccess
} from '@unit-store/actions';
import { UnitService } from '@unit/unit.service';
import { Unit } from '@core/models/unit.model';

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
