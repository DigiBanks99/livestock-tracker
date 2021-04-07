import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { KeyValue } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService, KeyEntity, PagedData } from '@core/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { CrudActions, PayloadAction } from './crud.actions';

export class CrudEffects<
  TData extends KeyEntity<TKey>,
  TKey,
  TFetchSinglePayload
> {
  public getAll$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`FETCH_${this.typeName}`),
      switchMap((action: Action) => this.handleFetchAction$(action)),
      map((data: PagedData<TData>) => this.typeActions.apiFetchItems(data)),
      catchError((error) => this.handleError(error, this.typeActions))
    )
  );

  public getSingle$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`FETCH_SINGLE_${this.typeName}`),
      map((action: PayloadAction<TFetchSinglePayload>) => action.payload),
      switchMap((payload: TFetchSinglePayload) => this.service.get(payload)),
      map((item: TData) => this.typeActions.apiFetchSingle(item)),
      catchError((error) => this.handleError(error, this.typeActions))
    )
  );

  public add$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`ADD_${this.typeName}`),
      map((action: PayloadAction<TData>) => action.payload),
      switchMap((item: TData) => this.service.add(item)),
      tap(() =>
        this.snackBar.open('Added successfully.', null, { duration: 2500 })
      ),
      map((item: TData) => this.typeActions.apiAddItem(item)),
      catchError((error) => this.handleError(error, this.typeActions))
    )
  );

  public update$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`UPDATE_${this.typeName}`),
      map((action: PayloadAction<KeyValue<TKey, TData>>) => action.payload),
      switchMap((payload: KeyValue<TKey, TData>) =>
        this.service.update(payload.value, payload.key)
      ),
      tap(() =>
        this.snackBar.open('Updated successfully.', null, { duration: 2500 })
      ),
      map((item: TData) =>
        this.typeActions.apiUpdateItem(
          { changes: item, id: String(item.id) },
          item.id
        )
      ),
      catchError((error) => this.handleError(error, this.typeActions))
    )
  );

  public remove$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`DELETE_${this.typeName}`),
      map((action: PayloadAction<TKey>) => action.payload),
      switchMap((id: TKey) => this.service.delete(id)),
      tap(() =>
        this.snackBar.open('Deleted successfully.', null, { duration: 2500 })
      ),
      map((id: TKey) => this.typeActions.apiDeleteItem(id)),
      catchError((error) => this.handleError(error, this.typeActions))
    )
  );

  protected get defaultFetchAction(): Action {
    return this.noOpAction;
  }

  private noOpAction: Action = {
    type: 'NOOP'
  };

  constructor(
    protected actions$: Actions,
    protected service: CrudService<TData, TKey, TFetchSinglePayload>,
    protected typeActions: CrudActions<TData, TKey>,
    protected typeName: string,
    private snackBar: MatSnackBar
  ) {}

  protected handleError(
    err: any,
    actions: CrudActions<TData, TKey>
  ): Observable<PayloadAction<Error>> {
    let error: Error;
    if (err instanceof Error) error = err;
    else if (err instanceof HttpErrorResponse) {
      const httpError = <HttpErrorResponse>err;
      error = new Error(httpError.error);
      error.name = httpError.name;
      error.stack = httpError.url;
    } else error = new Error(err);

    this.snackBar.open(`Failed: ${error.message}`, null, { duration: 2500 });
    return of(actions.apiError(error));
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<TData>> => this.service.getAll();
}
