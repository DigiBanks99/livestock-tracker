import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedType } from '@core/models/feed-type.model';
import { PagedData } from '@core/models/paged-data.model';
import { CrudEffects } from '@core/store';
import { FeedTypeService } from '@feed/services';
import {
  actions as feedTypeActions,
  FetchFeedTypesAction
} from '@feed/store/feed-type.actions';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { FeedTypeKey } from './constants';

@Injectable()
export class FeedTypeEffects extends CrudEffects<FeedType, number, number> {
  constructor(
    actions$: Actions,
    private feedTypeService: FeedTypeService,
    snackBar: MatSnackBar
  ) {
    super(actions$, feedTypeService, feedTypeActions, FeedTypeKey, snackBar);
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<FeedType>> => {
    const fetchAction = <FetchFeedTypesAction>action;
    return this.feedTypeService.getAll(
      fetchAction.pageNumber,
      fetchAction.pageSize,
      fetchAction.includeDeleted
    );
  };
}
