import { Observable, of, throwError } from 'rxjs';
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
      switchMap((action: Action) =>
        this.handleFetchAction$(action).pipe(
          tap(console.log),
          map((data: PagedData<TData>) => this.typeActions.apiFetchItems(data)),
          catchError((error) => this.handleError(error, this.typeActions))
        )
      ),
      catchError((error) => this.handleError(error, this.typeActions))
    )
  );

  public getSingle$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`FETCH_SINGLE_${this.typeName}`),
      map((action: PayloadAction<TFetchSinglePayload>) => action.payload),
      switchMap((payload: TFetchSinglePayload) =>
        this.service.get(payload).pipe(
          map((item: TData) => this.typeActions.apiFetchSingle(item)),
          catchError((error: HttpErrorResponse) =>
            this.handleError(error, this.typeActions)
          )
        )
      ),
      catchError((error) => this.handleError(error, this.typeActions))
    )
  );

  public add$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`ADD_${this.typeName}`),
      map((action: PayloadAction<TData>) => action.payload),
      switchMap((item: TData) =>
        this.service.add(item).pipe(
          tap(() =>
            this.snackBar.open('Added successfully.', undefined, {
              duration: 2500
            })
          ),
          map((addedItem: TData) => this.typeActions.apiAddItem(addedItem)),
          catchError((error) => this.handleError(error, this.typeActions))
        )
      ),
      catchError((error) => this.handleError(error, this.typeActions))
    )
  );

  public update$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`UPDATE_${this.typeName}`),
      map((action: PayloadAction<KeyValue<TKey, TData>>) => action.payload),
      switchMap((payload: KeyValue<TKey, TData>) =>
        this.service.update(payload.value, payload.key).pipe(
          tap(() =>
            this.snackBar.open('Updated successfully.', undefined, {
              duration: 2500
            })
          ),
          map((item: TData) =>
            this.typeActions.apiUpdateItem(
              { changes: item, id: String(item.id) },
              item.id
            )
          ),
          catchError((error) => this.handleError(error, this.typeActions))
        )
      ),
      catchError((error) => this.handleError(error, this.typeActions))
    )
  );

  public remove$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`DELETE_${this.typeName}`),
      map((action: PayloadAction<TKey>) => action.payload),
      switchMap((id: TKey) =>
        this.service.delete(id).pipe(
          tap(() =>
            this.snackBar.open('Deleted successfully.', undefined, {
              duration: 2500
            })
          ),
          map((deletedId: TKey) => this.typeActions.apiDeleteItem(deletedId)),
          catchError((error) => this.handleError(error, this.typeActions))
        )
      ),
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
    protected typeActions: CrudActions<TData, TKey, TFetchSinglePayload>,
    protected typeName: string,
    private snackBar: MatSnackBar
  ) {}

  protected handleError(
    err: any,
    actions: CrudActions<TData, TKey, TFetchSinglePayload>
  ): Observable<PayloadAction<Error>> {
    let error: Error;
    if (err instanceof Error) error = err;
    else if (err instanceof HttpErrorResponse) {
      const httpError = <HttpErrorResponse>err;
      error = new Error(httpError.error);
      error.name = httpError.name;
      error.stack = httpError.url ?? undefined;
    } else error = new Error(err);

    this.snackBar.open(`Failed: ${error.message}`, null, { duration: 2500 });
    return of(actions.apiError(error));
  }

  protected handleFetchAction$ = (
    action: Action,
    retryCount = 0
  ): Observable<PagedData<TData>> =>
    this.service.getAll().pipe(
      catchError((err: HttpErrorResponse): Observable<PagedData<TData>> => {
        if (retryCount > 3) {
          return throwError(() => err);
        }

        return this.handleFetchAction$(action, retryCount++);
      })
    );
}
