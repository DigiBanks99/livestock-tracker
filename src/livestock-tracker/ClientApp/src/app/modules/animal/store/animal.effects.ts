import { Observable, of } from 'rxjs';
import { concatMap, filter, map, withLatestFrom } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnimalProviderModule } from '@animal/animal-provider.module';
import { AnimalService } from '@animal/services';
import { Animal, PagedData } from '@core/models';
import {
  AnimalState,
  CrudEffects,
  NoopAction,
  PayloadAction
} from '@core/store';
import { getSelectedAnimal } from '@core/store/selectors';
import { environment } from '@env/environment';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ROUTER_NAVIGATION,
  RouterNavigatedAction,
  SerializedRouterStateSnapshot
} from '@ngrx/router-store';
import { Action, select, Store } from '@ngrx/store';

import { AnimalActionTypes } from './animal.action-types';
import { actions, FetchAnimalsAction } from './animal.actions';
import { AnimalKey } from './constants';

@Injectable({
  providedIn: AnimalProviderModule
})
export class AnimalEffects extends CrudEffects<Animal, number, number> {
  public animalSelectedInRoute$: Observable<
    PayloadAction<number> | Action
  > = createEffect(() =>
    this.actions$.pipe(
      filter((action) => action.type === ROUTER_NAVIGATION),
      filter((action: RouterNavigatedAction<SerializedRouterStateSnapshot>) =>
        /animal\/[0-9]*/.test(action.payload.event.urlAfterRedirects)
      ),
      map((action: RouterNavigatedAction<SerializedRouterStateSnapshot>):
        | PayloadAction<number>
        | Action => {
        const id = Number(action.payload.routerState.root.firstChild.params.id);
        if (Number.isNaN(id)) {
          return NoopAction;
        }
        return actions.selectItem(id);
      })
    )
  );

  public fetchSelectedAnimalDetail$: Observable<
    PayloadAction<number> | Action
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActionTypes.SelectAnimal),
      concatMap((action: PayloadAction<number>) =>
        of(action).pipe(
          withLatestFrom(this._store.pipe(select(getSelectedAnimal)))
        )
      ),
      map(([action, animal]: [PayloadAction<number>, Animal]):
        | PayloadAction<number>
        | Action =>
        animal == null || animal.batchNumber == null
          ? actions.fetchSingle(action.payload)
          : NoopAction
      )
    )
  );

  protected get defaultFetchAction(): Action {
    return new FetchAnimalsAction(0, environment.pageSize);
  }

  constructor(
    private readonly _store: Store<AnimalState>,
    protected readonly actions$: Actions,
    protected readonly animalService: AnimalService,
    snackBar: MatSnackBar
  ) {
    super(actions$, animalService, actions, AnimalKey, snackBar);
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<Animal>> => {
    const fetchAction = <FetchAnimalsAction>action;
    return this.animalService.getAll(
      fetchAction.pageSize,
      fetchAction.pageNumber
    );
  };
}
