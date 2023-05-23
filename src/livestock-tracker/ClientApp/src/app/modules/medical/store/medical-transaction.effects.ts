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
import {
  AnimalActionTypes,
  AnimalStore
} from '@animal/store';
import { SelectAnimalAction } from '@animal/store/animal.actions';
import { MedicalTransaction } from '@core/models';
import {
  AnimalState,
  FetchAnimalTransactionEffects,
  getSelectedAnimalId,
  NoopAction,
  PayloadAction,
  RouterStore
} from '@core/store';
import { environment } from '@env/environment.prod';
import { MedicalTransactionService } from '@medical/services';
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

import { MedicalStoreConstants } from './constants';
import { actions } from './medical-transaction.actions';

@Injectable()
export class MedicalTransactionEffects extends FetchAnimalTransactionEffects<MedicalTransaction> {
  public transactionSelectedInRoute$: Observable<
    PayloadAction<number> | Action
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((action: RouterNavigatedAction<SerializedRouterStateSnapshot>) =>
        /medicine\/\d+\/edit\/\d+$/.test(action.payload.event.urlAfterRedirects)
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

  public animalSelected$: Observable<PayloadAction<number> | Action> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(AnimalActionTypes.SelectAnimal),
        concatLatestFrom(() => this._store.select(RouterStore.selectors.url)),
        filter(([action, url]: [SelectAnimalAction, string]) => {
          const matches = url.match(/medicine\/(?<animalId>\d+)/);
          console.log('m', matches);
          if (matches === null) {
            return false;
          }
          const urlAnimalId = matches.groups.animalId;
          return String(action.payload) !== urlAnimalId;
        }),
        map(([action]: [SelectAnimalAction, string]): Action => {
          this._router.navigate(['medicine', String(action.payload)]);
          return NoopAction;
        })
      )
    );

  public animalSelectedInRoute$: Observable<PayloadAction<number> | Action> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((action: RouterNavigatedAction<SerializedRouterStateSnapshot>) =>
          /medicine\/\d+/.test(action.payload.event.urlAfterRedirects)
        ),
        concatLatestFrom(() => this._store.select(getSelectedAnimalId)),
        map(
          ([action, selectedAnimalId]: [
            RouterNavigatedAction<SerializedRouterStateSnapshot>,
            number
          ]): PayloadAction<number> | Action => {
            const id = Number(
              action.payload.routerState.root.firstChild.firstChild.params
                .animalId
            );
            if (Number.isNaN(id) || id === selectedAnimalId) {
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
      concatLatestFrom(() => this._store.select(RouterStore.selectors.url)),
      filter(([, url]: [Action, string]) => /medicine\/\d+$/.test(url)),
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
      ofType(`API_ADD_${MedicalStoreConstants.Transactions.StoreKey}`),
      tap((action: PayloadAction<MedicalTransaction>) =>
        this._router.navigate(['/medicine', action.payload.animalId])
      ),
      map(() => this.transactionActions.resetSaveState())
    )
  );

  public transactionUpdated$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(`API_UPDATE_${MedicalStoreConstants.Transactions.StoreKey}`),
      tap(
        (action: PayloadAction<KeyValue<number, Update<MedicalTransaction>>>) =>
          this._router.navigate([
            '/medicine',
            action.payload.value.changes.animalId
          ])
      ),
      map(() => this.transactionActions.resetSaveState())
    )
  );

  constructor(
    actions$: Actions,
    private readonly _store: Store,
    animalStore: Store<AnimalState>,
    medicalTransactionService: MedicalTransactionService,
    snackBar: MatSnackBar,
    private readonly _router: Router
  ) {
    super(
      actions$,
      animalStore,
      medicalTransactionService,
      actions,
      MedicalStoreConstants.Transactions.ActionKey,
      snackBar
    );
  }
}
