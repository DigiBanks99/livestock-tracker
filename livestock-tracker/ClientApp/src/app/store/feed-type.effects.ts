import { Actions, Effect, ofType } from '@ngrx/effects';
import { FeedTypeService } from '@feed-type/feed-type.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  ActionTypes,
  SetFeedTypes,
  FeedTypeError,
  AddFeedType,
  AddFeedTypeSuccess,
  UpdateFeedType,
  UpdateFeedTypeSuccess,
  RemoveFeedType,
  RemoveFeedTypeSuccess,
  FetchFeedTypes
} from './feed-type.actions';
import { map, switchMap, catchError, startWith } from 'rxjs/operators';
import { FeedType } from '@core/models/feed-type.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class FeedTypeEffects {
  constructor(
    private actions$: Actions,
    private feedTypeService: FeedTypeService
  ) {}

  @Effect()
  getAll$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.FETCH_FEED_TYPES),
    startWith(new FetchFeedTypes()),
    switchMap(() => this.feedTypeService.getFeedTypes()),
    map((feedTypes: FeedType[]) => new SetFeedTypes(feedTypes)),
    catchError(handleError)
  );

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.ADD_FEED_TYPE),
    map((action: AddFeedType) => action.feedType),
    switchMap((feedType: FeedType) => this.feedTypeService.add(feedType)),
    map((feedType: FeedType) => new AddFeedTypeSuccess(feedType)),
    catchError(handleError)
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_FEED_TYPE),
    map((action: UpdateFeedType) => action.feedType),
    switchMap((feedType: FeedType) => this.feedTypeService.update(feedType)),
    map(
      (feedType: FeedType) =>
        new UpdateFeedTypeSuccess({ changes: feedType, id: feedType.id })
    ),
    catchError(handleError)
  );

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.REMOVE_FEED_TYPE),
    map((action: RemoveFeedType) => action.id),
    switchMap((id: number) => this.feedTypeService.delete(id)),
    map((id: number) => new RemoveFeedTypeSuccess(id)),
    catchError(handleError)
  );
}

function handleError(err: any): Observable<FeedTypeError> {
  let error: Error;
  if (err instanceof Error) error = err;
  else if (err instanceof HttpErrorResponse) {
    const httpError = <HttpErrorResponse>err;
    error = new Error(httpError.error);
    error.name = httpError.name;
    error.stack = httpError.url;
  } else error = new Error(err);

  return of(new FeedTypeError(error));
}
