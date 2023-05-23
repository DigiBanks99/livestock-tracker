import { Observable } from 'rxjs';
import {
  filter,
  map
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedType } from '@core/models/feed-type.model';
import { PagedData } from '@core/models/paged-data.model';
import {
  CrudEffects,
  PayloadAction
} from '@core/store';
import { FeedStore } from '@feed-store';
import { FeedTypeService } from '@feed/services';
import {
  actions as feedTypeActions,
  FetchFeedTypesAction
} from '@feed/store/feed-type.actions';
import {
  Actions,
  concatLatestFrom,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  ROUTER_NAVIGATION,
  RouterNavigatedAction,
  SerializedRouterStateSnapshot
} from '@ngrx/router-store';
import {
  Action,
  Store
} from '@ngrx/store';

import { FeedTypeKey } from './constants';

@Injectable()
export class FeedTypeEffects extends CrudEffects<FeedType, number, number> {
  public feedRouteVisited$: Observable<
    PayloadAction<number> | PayloadAction<FeedType[]> | Action
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((action: RouterNavigatedAction<SerializedRouterStateSnapshot>) =>
        /feed\/(\d+|type)/.test(action.payload.event.urlAfterRedirects)
      ),
      concatLatestFrom(() =>
        this._store.select(FeedStore.Feed.selectors.feedTypes)
      ),
      concatLatestFrom(() =>
        this._store.select(FeedStore.Feed.selectors.recordCount)
      ),
      map(([[, feedTypes], recordCount]) =>
        feedTypes.length === 0
          ? feedTypeActions.fetchItems()
          : feedTypeActions.apiFetchItems({
              data: feedTypes,
              pageCount: recordCount / 10,
              currentPage: 0,
              pageSize: 10,
              totalRecordCount: recordCount
            })
      )
    )
  );

  constructor(
    actions$: Actions,
    private readonly _feedTypeService: FeedTypeService,
    snackBar: MatSnackBar,
    private readonly _store: Store
  ) {
    super(actions$, _feedTypeService, feedTypeActions, FeedTypeKey, snackBar);
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<FeedType>> => {
    const fetchAction = <FetchFeedTypesAction>action;
    return this._feedTypeService.getAll(
      fetchAction.pageNumber,
      fetchAction.pageSize,
      fetchAction.includeDeleted
    );
  };
}
