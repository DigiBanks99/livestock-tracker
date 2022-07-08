import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnimalStore } from '@animal/store';
import {
  AnimalState,
  FetchAnimalTransactionEffects,
  NoopAction,
  PayloadAction,
  RouterStore
} from '@core/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import {
  ROUTER_NAVIGATION,
  RouterNavigatedAction,
  SerializedRouterStateSnapshot
} from '@ngrx/router-store';
import { Action, Store } from '@ngrx/store';
import { WeightTransaction } from '@weight/interfaces';
import { WeightService } from '@weight/services';
import { WeightProviderModule } from '@weight/weight-provider.module';

import { actions } from './weight.actions';
import { Constants } from './weight.constants';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@env/environment.prod';

@Injectable({
  providedIn: WeightProviderModule
})
export class WeightEffects extends FetchAnimalTransactionEffects<WeightTransaction> {
  public transactionSelectedInRoute$: Observable<
    PayloadAction<number> | Action
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((action: RouterNavigatedAction<SerializedRouterStateSnapshot>) =>
        /weight\/\d+\/edit\/\d+$/.test(action.payload.event.urlAfterRedirects)
      ),
      map(
        (
          action: RouterNavigatedAction<SerializedRouterStateSnapshot>
        ): PayloadAction<number> | Action => {
          const id = Number(
            action.payload.routerState.root.firstChild.firstChild.params.id
          );
          if (Number.isNaN(id)) {
            return NoopAction;
          }
          return this.transactionActions.selectItem(id);
        }
      )
    )
  );

  public animalSelectedInRoute$: Observable<PayloadAction<number> | Action> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((action: RouterNavigatedAction<SerializedRouterStateSnapshot>) =>
          /weight\/\d+/.test(action.payload.event.urlAfterRedirects)
        ),
        map(
          (
            action: RouterNavigatedAction<SerializedRouterStateSnapshot>
          ): PayloadAction<number> | Action => {
            const id = Number(
              action.payload.routerState.root.firstChild.firstChild.params
                .animalId
            );
            if (Number.isNaN(id)) {
              return NoopAction;
            }
            return AnimalStore.actions.selectItem(id);
          }
        )
      )
    );

  public fetchSelectedAnimalTransactions$: Observable<
    PayloadAction<PageEvent>
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(`API_FETCH_SINGLE_ANIMAL`),
      concatLatestFrom(() => this.store.select(RouterStore.selectors.url)),
      filter(([, url]: [Action, string]) => /weight\/\d+$/.test(url)),
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
      ofType(`API_ADD_${Constants.StoreKey}`),
      tap((action: PayloadAction<WeightTransaction>) =>
        this.router.navigate(['/weight', action.payload.animalId])
      ),
      map(() => actions.resetSaveState())
    )
  );

  public transactionUpdated$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`API_UPDATE_${Constants.StoreKey}`),
      tap(
        (action: PayloadAction<KeyValue<number, Update<WeightTransaction>>>) =>
          this.router.navigate([
            '/weight',
            action.payload.value.changes.animalId
          ])
      ),
      map(() => actions.resetSaveState())
    )
  );

  constructor(
    actions$: Actions,
    animalStore: Store<AnimalState>,
    private readonly store: Store,
    weightService: WeightService,
    snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    super(
      actions$,
      animalStore,
      weightService,
      actions,
      Constants.StoreKey,
      snackBar
    );
  }
}
