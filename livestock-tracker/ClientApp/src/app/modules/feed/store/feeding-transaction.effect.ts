import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { PagedData } from '@core/models/paged-data.model';
import { CrudEffects } from '@core/store/crud.effects';
import { FeedingTransactionService } from '@feed/services';
import {
  actions as feedingTransactionActions,
  FetchFeedingTransaction,
  FetchSingleFeedTransactionParams
} from '@feed/store/feeding-transaction.actions';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { FeedingTransactionKey } from './constants';

@Injectable()
export class FeedingTransactionEffects extends CrudEffects<
  FeedingTransaction,
  number,
  FetchSingleFeedTransactionParams
> {
  constructor(
    protected actions$: Actions,
    private feedingTransactionService: FeedingTransactionService,
    snackBar: MatSnackBar
  ) {
    super(
      actions$,
      feedingTransactionService,
      feedingTransactionActions,
      FeedingTransactionKey,
      snackBar
    );
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<FeedingTransaction>> => {
    const fetchAction = <FetchFeedingTransaction>action;
    return this.feedingTransactionService.getAll(
      fetchAction.animalId,
      fetchAction.pageNumber,
      fetchAction.pageSize
    );
  };
}
