import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  ActionTypes,
  FetchFeedingTransactions,
  SetFeedTransactions,
  FeedTransactionError,
  AddFeedTransaction,
  AddFeedTransactionSucceeded,
  UpdateFeedTransaction,
  UpdateFeedTransactionSucceeded,
  RemoveFeedTransaction,
  RemoveFeedTransactionSucceeded
} from '@feeding-transaction-store/actions';
import { FeedingTransactionService } from '@feeding-transaction/feeding-transaction.service';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import {
  ActionTypes as AnimalActionTypes,
  SelectAnimal
} from '@animal-store/actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FeedingTransactionEffects {
  constructor(
    private actions$: Actions,
    private feedingTransactionService: FeedingTransactionService
  ) {}

  @Effect()
  selectedAnimalChanged$: Observable<Action> = this.actions$.pipe(
    ofType(AnimalActionTypes.SELECT_ANIMAL),
    map((action: SelectAnimal) => action.key),
    map((animalId: number) => new FetchFeedingTransactions(animalId))
  );

  @Effect()
  getAll$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.FETCH_FEED_TRANSACTIONS),
    map((action: FetchFeedingTransactions) => action.animalId),
    switchMap((id: number) => this.feedingTransactionService.get(id)),
    map(
      (transactions: FeedingTransaction[]) =>
        new SetFeedTransactions(transactions)
    ),
    catchError(handleError)
  );

  @Effect()
  addOne$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.ADD_FEED_TRANSACTION),
    map((action: AddFeedTransaction) => action.transaction),
    switchMap((transaction: FeedingTransaction) =>
      this.feedingTransactionService.add(transaction)
    ),
    map(
      (transaction: FeedingTransaction) =>
        new AddFeedTransactionSucceeded(transaction)
    ),
    catchError(handleError)
  );

  @Effect()
  updateOne$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_FEED_TRANSACTION),
    map((action: UpdateFeedTransaction) => action.transaction),
    switchMap((transaction: FeedingTransaction) =>
      this.feedingTransactionService.patch(transaction)
    ),
    map(
      (updateTransaction: FeedingTransaction) =>
        new UpdateFeedTransactionSucceeded({
          id: updateTransaction.id,
          changes: updateTransaction
        })
    ),
    catchError(handleError)
  );

  @Effect()
  removeOne$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.REMOVE_FEED_TRANSACTION),
    map((action: RemoveFeedTransaction) => action.id),
    switchMap((id: number) => this.feedingTransactionService.deleteById(id)),
    map((id: number) => new RemoveFeedTransactionSucceeded(id)),
    catchError(handleError)
  );
}

function handleError(err: any): Observable<FeedTransactionError> {
  let error: Error;
  if (err instanceof Error) error = err;
  else if (err instanceof HttpErrorResponse) {
    const httpError = <HttpErrorResponse>err;
    error = new Error(httpError.error);
    error.name = httpError.name;
    error.stack = httpError.url;
  } else error = new Error(err);

  return of(new FeedTransactionError(error));
}
