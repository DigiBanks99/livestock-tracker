import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { FeedType } from '@core/models/feed-type.model';
import { PagedData } from '@core/models/paged-data.model';
import { CrudEffects } from '@core/store/crud.effects';
import { FeedTypeService } from '@feed/services/feed-type.service';
import {
  actions as feedTypeActions,
  ActionTypes,
  FetchFeedTypes
} from '@feed/store/feed-type.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { FeedTypeKey } from './constants';

@Injectable()
export class FeedTypeEffects extends CrudEffects<
  FeedType,
  number,
  PagedData<FeedType>,
  number
> {
  constructor(actions$: Actions, private feedTypeService: FeedTypeService) {
    super(actions$, feedTypeService, feedTypeActions, FeedTypeKey);
  }

  getAll$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.FETCH_FEED_TYPES),
      switchMap((action: FetchFeedTypes) =>
        this.feedTypeService.getAll(
          action.pageNumber,
          action.pageSize,
          action.includeDeleted
        )
      ),
      map((data: PagedData<FeedType>) => feedTypeActions.apiFetchItems(data)),
      catchError((error) => this.handleError(error, feedTypeActions))
    )
  );
}
