import { filter, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AnimalState,
  FetchAnimalTransactionEffects,
  PayloadAction
} from '@core/store';
import { Actions, createEffect } from '@ngrx/effects';
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

@Injectable({
  providedIn: WeightProviderModule
})
export class WeightEffects extends FetchAnimalTransactionEffects<
  WeightTransaction
> {
  public transactionSelectedInRoute$ = createEffect(() =>
    this.actions$.pipe(
      filter((action) => action.type === ROUTER_NAVIGATION),
      filter((action: RouterNavigatedAction<SerializedRouterStateSnapshot>) =>
        /weight\/[0-9]*\/edit/.test(action.payload.event.urlAfterRedirects)
      ),
      map((action: RouterNavigatedAction<SerializedRouterStateSnapshot>):
        | PayloadAction<number>
        | Action => {
        const id = Number(
          action.payload.routerState.root.firstChild.firstChild.params.id
        );
        if (Number.isNaN(id)) {
          return {
            type: 'NOOP'
          };
        }
        return this.transactionActions.selectItem(id);
      })
    )
  );

  constructor(
    actions$: Actions,
    animalStore: Store<AnimalState>,
    weightService: WeightService,
    snackBar: MatSnackBar
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
