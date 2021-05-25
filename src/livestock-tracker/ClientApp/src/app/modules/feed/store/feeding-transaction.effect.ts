import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedingTransaction, PagedData } from '@core/models';
import { CrudEffects } from '@core/store';
import { FeedingTransactionService } from '@feed/services';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { FeedingTransactionKey } from './constants';
import {
  actions as feedingTransactionActions,
  FetchFeedingTransactionAction,
  FetchSingleFeedTransactionParams
} from './feeding-transaction.actions';

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
    const fetchAction = <FetchFeedingTransactionAction>action;
    return this.feedingTransactionService.getAll(
      fetchAction.animalId,
      fetchAction.pageNumber,
      fetchAction.pageSize
    );
  };
}
