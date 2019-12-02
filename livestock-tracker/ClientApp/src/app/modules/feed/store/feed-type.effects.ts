import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { KeyValue } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedType } from '@core/models/feed-type.model';
import { PayloadAction } from '@core/store';
import { FeedTypeService } from '@feed/services/feed-type.service';
import { actions, ActionTypes } from '@feed/store/feed-type.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

@Injectable()
export class FeedTypeEffects {
  constructor(
    private actions$: Actions,
    private feedTypeService: FeedTypeService
  ) {}

  @Effect()
  getAll$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.FETCH_FEED_TYPES),
    startWith(actions.fetchItems()),
    switchMap(() => this.feedTypeService.getFeedTypes()),
    map((feedTypes: FeedType[]) => actions.apiFetchItems(feedTypes)),
    catchError(handleError)
  );

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.ADD_FEED_TYPE),
    map((action: PayloadAction<FeedType>) => action.payload),
    switchMap((feedType: FeedType) => this.feedTypeService.add(feedType)),
    map((feedType: FeedType) => actions.apiAddItem(feedType)),
    catchError(handleError)
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_FEED_TYPE),
    map(
      (action: PayloadAction<KeyValue<string, FeedType>>) =>
        action.payload.value
    ),
    switchMap((feedType: FeedType) => this.feedTypeService.update(feedType)),
    map((feedType: FeedType) =>
      actions.apiUpdateItem({ changes: feedType, id: feedType.id }, feedType.id)
    ),
    catchError(handleError)
  );

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType('DELETE_FEED_TYPE'),
    map((action: PayloadAction<number>) => action.payload),
    switchMap((id: number) => this.feedTypeService.delete(id)),
    map((id: number) => actions.apiDeleteItem(id)),
    catchError(handleError)
  );
}

function handleError(err: any): Observable<PayloadAction<Error>> {
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
