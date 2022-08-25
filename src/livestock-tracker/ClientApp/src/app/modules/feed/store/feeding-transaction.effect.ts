import { Observable } from 'rxjs';
import {
  filter,
  map,
  tap
} from 'rxjs/operators';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnimalStore } from '@animal/store';
import { FeedingTransaction } from '@core/models';
import {
  AnimalState,
  FetchAnimalTransactionEffects,
  NoopAction,
  PayloadAction,
  RouterStore
} from '@core/store';
import { environment } from '@env/environment';
import { FeedingTransactionService } from '@feed/services';
import {
  Actions,
  concatLatestFrom,
  createEffect,
  ofType
} from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import {
  ROUTER_NAVIGATION,
  RouterNavigatedAction,
  SerializedRouterStateSnapshot
} from '@ngrx/router-store';
import {
  Action,
  Store
} from '@ngrx/store';

import { FeedStoreConstants } from './constants';
import { actions } from './feeding-transaction.actions';

@Injectable()
export class FeedingTransactionEffects extends FetchAnimalTransactionEffects<FeedingTransaction> {
  public transactionSelectedInRoute$: Observable<
    PayloadAction<number> | Action
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((action: RouterNavigatedAction<SerializedRouterStateSnapshot>) =>
        /feed\/\d+\/edit\/\d+$/.test(action.payload.event.urlAfterRedirects)
      ),
      map((action: RouterNavigatedAction<SerializedRouterStateSnapshot>):
        | PayloadAction<number>
        | Action => {
        const id = Number(
          action.payload.routerState.root.firstChild.firstChild.params.id
        );
        if (Number.isNaN(id)) {
          return NoopAction;
        }
        return this.transactionActions.selectItem(id);
      })
    )
  );

  public animalSelectedInRoute$: Observable<PayloadAction<number> | Action> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((action: RouterNavigatedAction<SerializedRouterStateSnapshot>) =>
          /feed\/\d+/.test(action.payload.event.urlAfterRedirects)
        ),
        map((action: RouterNavigatedAction<SerializedRouterStateSnapshot>):
          | PayloadAction<number>
          | Action => {
          const id = Number(
            action.payload.routerState.root.firstChild.firstChild.params
              .animalId
          );
          if (Number.isNaN(id)) {
            return NoopAction;
          }
          return AnimalStore.actions.selectItem(id);
        })
      )
    );

  public fetchSelectedAnimalTransactions$: Observable<
    PayloadAction<PageEvent>
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(`API_FETCH_SINGLE_ANIMAL`),
      concatLatestFrom(() => this._store.select(RouterStore.selectors.url)),
      filter(([, url]: [Action, string]) => /feed\/\d+$/.test(url)),
      map(
        (): PayloadAction<PageEvent> =>
          this.transactionActions.fetchAnimalTransactions(
            0,
            environment.pageSize
          )
      )
    )
  );

  public transactionAdded$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`API_ADD_${FeedStoreConstants.Transactions.ActionKey}`),
      tap((action: PayloadAction<FeedingTransaction>) =>
        this._router.navigate(['/feed', action.payload.animalId])
      ),
      map(() => this.transactionActions.resetSaveState())
    )
  );

  public transactionUpdated$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`API_UPDATE_${FeedStoreConstants.Transactions.ActionKey}`),
      tap(
        (action: PayloadAction<KeyValue<number, Update<FeedingTransaction>>>) =>
          this._router.navigate([
            '/feed',
            action.payload.value.changes.animalId
          ])
      ),
      map(() => this.transactionActions.resetSaveState())
    )
  );
  constructor(
    protected readonly actions$: Actions,
    private readonly _store: Store,
    animalStore: Store<AnimalState>,
    feedingTransactionService: FeedingTransactionService,
    snackBar: MatSnackBar,
    private readonly _router: Router
  ) {
    super(
      actions$,
      animalStore,
      feedingTransactionService,
      actions,
      FeedStoreConstants.Transactions.ActionKey,
      snackBar
    );
  }
}
