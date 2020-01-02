import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { KeyValue } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { CrudService } from '@core/models/crud-service.interface';
import { KeyEntity } from '@core/models/key-entity.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { CrudActions, PayloadAction } from './crud.actions';

export class CrudEffects<T extends KeyEntity<K>, K> {
  constructor(
    protected actions$: Actions,
    private service: CrudService<T, K>,
    private typeActions: CrudActions<T, K>,
    private typeName: string
  ) {}

  public getAll$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`FETCH_${this.typeName}`),
      startWith(() => this.typeActions.fetchItems()),
      switchMap(_ => this.service.getAll()),
      map((items: T[]) => this.typeActions.apiFetchItems(items)),
      catchError(error => this.handleError(error, this.typeActions))
    )
  );

  public add$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`ADD_${this.typeName}`),
      map((action: PayloadAction<T>) => action.payload),
      switchMap((item: T) => this.service.add(item)),
      map((item: T) => this.typeActions.apiAddItem(item)),
      catchError(error => this.handleError(error, this.typeActions))
    )
  );

  public update$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`UPDATE_${this.typeName}`),
      map((action: PayloadAction<KeyValue<K, T>>) => action.payload),
      switchMap((payload: KeyValue<K, T>) =>
        this.service.update(payload.value, payload.key)
      ),
      map((item: T) =>
        this.typeActions.apiUpdateItem(
          { changes: item, id: String(item.id) },
          item.id
        )
      ),
      catchError(error => this.handleError(error, this.typeActions))
    )
  );

  public remove$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`DELETE_${this.typeName}`),
      map((action: PayloadAction<K>) => action.payload),
      switchMap((id: K) => this.service.delete(id)),
      map((id: K) => this.typeActions.apiDeleteItem(id)),
      catchError(error => this.handleError(error, this.typeActions))
    )
  );

  protected handleError(
    err: any,
    actions: CrudActions<T, K>
  ): Observable<PayloadAction<Error>> {
    let error: Error;
    if (err instanceof Error) error = err;
    else if (err instanceof HttpErrorResponse) {
      const httpError = <HttpErrorResponse>err;
      error = new Error(httpError.error);
      error.name = httpError.name;
      error.stack = httpError.url;
    } else error = new Error(err);

    return of(actions.apiError(error));
  }
}
