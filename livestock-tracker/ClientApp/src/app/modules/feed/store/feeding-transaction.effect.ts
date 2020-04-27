import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  ActionTypes as AnimalActionTypes,
  SelectAnimal
} from '@animal/store/animal.actions';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { PagedData } from '@core/models/paged-data.model';
import { CrudEffects } from '@core/store/crud.effects';
import { FeedingTransactionService } from '@feed/services';
import {
  actions as feedingTransactionActions,
  ActionTypes,
  FetchFeedingTransaction,
  FetchSingleFeedTransactionParams
} from '@feed/store/feeding-transaction.actions';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { FeedingTransactionKey } from './constants';

@Injectable()
export class FeedingTransactionEffects extends CrudEffects<
  FeedingTransaction,
  number,
  PagedData<FeedingTransaction>,
  FetchSingleFeedTransactionParams
> {
  constructor(
    protected actions$: Actions,
    private feedingTransactionService: FeedingTransactionService
  ) {
    super(
      actions$,
      feedingTransactionService,
      feedingTransactionActions,
      FeedingTransactionKey
    );
  }

  getAll$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.FETCH_FEED_TRANSACTION),
      switchMap((action: FetchFeedingTransaction) =>
        this.feedingTransactionService.getAll(
          action.animalId,
          action.pageNumber,
          action.pageSize
        )
      ),
      map((data: PagedData<FeedingTransaction>) =>
        feedingTransactionActions.apiFetchItems(data)
      ),
      catchError((error) => this.handleError(error, feedingTransactionActions))
    )
  );
}
