import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnimalActionTypes } from '@animal/store/animal.action-types';
import { AnimalTransaction, PagedData } from '@core/models';
import { AnimalTransactionService } from '@core/models/services';
import { environment } from '@env/environment';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType
} from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { CrudEffects, PayloadAction } from '../crud';
import { getSelectedAnimalId } from '../selectors';
import { AnimalState } from './animal-state.interface';
import { FetchAnimalTransactionActions } from './fetch-animal-transaction.actions';

export class FetchAnimalTransactionEffects<
  TData extends AnimalTransaction
> extends CrudEffects<TData, number, TData> {
  /**
   * Fetches the transactions for the current active animal when the active
   * animal changes.
   */
  public selectedAnimalChanged$: Observable<PayloadAction<PageEvent>> &
    CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActionTypes.SelectAnimal),
      map(() =>
        this.transactionActions.fetchAnimalTransactions(0, environment.pageSize)
      )
    )
  );

  /**
   * Retrieves the transactions for the active animal when a fetch transactions
   * action is fired.
   */
  public getAllAnimalTransactions$: Observable<
    | PayloadAction<{
        animalId: number;
        data: PagedData<TData>;
      }>
    | PayloadAction<Error>
  > &
    CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(`FETCH_ANIMAL_TRANSACTIONS_${this.typeName}`),
      concatMap((action: PayloadAction<PageEvent>) =>
        of(action).pipe(
          withLatestFrom(this.animalStore.select(getSelectedAnimalId)),
          switchMap(([, animalId]: [PayloadAction<PageEvent>, number]) =>
            this.transactionService
              .getAnimalTransactions(animalId, action.payload)
              .pipe(
                map((animalTransactions: PagedData<TData>) =>
                  this.transactionActions.apiFetchAnimalTransactions(
                    animalId,
                    animalTransactions
                  )
                )
              )
          )
        )
      ),
      catchError((error) => this.handleError(error, this.typeActions))
    )
  );

  protected get transactionService(): AnimalTransactionService<TData> {
    return <AnimalTransactionService<TData>>this.service;
  }

  protected get transactionActions(): FetchAnimalTransactionActions<TData> {
    return <FetchAnimalTransactionActions<TData>>this.typeActions;
  }

  constructor(
    actions$: Actions,
    protected readonly animalStore: Store<AnimalState>,
    transactionService: AnimalTransactionService<TData>,
    typeActions: FetchAnimalTransactionActions<TData>,
    typeName: string,
    snackBar: MatSnackBar
  ) {
    super(actions$, transactionService, typeActions, typeName, snackBar);
  }
}
