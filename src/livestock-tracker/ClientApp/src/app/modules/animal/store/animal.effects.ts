import {
  Observable,
  of,
  throwError
} from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnimalProviderModule } from '@animal/animal-provider.module';
import {
  RecordAnimalDeath,
  SellAnimal
} from '@animal/events';
import { AnimalService } from '@animal/services';
import {
  Animal,
  PagedData
} from '@core/models';
import {
  AnimalState,
  CrudEffects,
  NoopAction,
  PayloadAction
} from '@core/store';
import { getSelectedAnimal } from '@core/store/selectors';
import { environment } from '@env/environment';
import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  ROUTER_NAVIGATED,
  RouterNavigatedAction,
  SerializedRouterStateSnapshot
} from '@ngrx/router-store';
import {
  Action,
  select,
  Store
} from '@ngrx/store';

import { AnimalActionTypes } from './animal.action-types';
import {
  actions,
  ArchiveAnimals,
  FetchAnimalsAction,
  RecordAnimalDeathAction,
  SellAnimalAction,
  UnarchiveAnimals
} from './animal.actions';
import * as AnimalSelectors from './animal.store';
import { AnimalKey } from './constants';

@Injectable({
  providedIn: AnimalProviderModule
})
export class AnimalEffects extends CrudEffects<Animal, number, number> {
  public animalSelectedInRoute$: Observable<PayloadAction<number> | Action> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        filter((action: RouterNavigatedAction<SerializedRouterStateSnapshot>) =>
          /animal\/[0-9]*/.test(action.payload.event.urlAfterRedirects)
        ),
        map((action: RouterNavigatedAction<SerializedRouterStateSnapshot>):
          | PayloadAction<number>
          | Action => {
          const id = Number(
            action.payload.routerState.root.firstChild.params.id
          );
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

  public archiveAnimals$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActionTypes.ArchiveAnimals),
      switchMap((action: ArchiveAnimals) =>
        this.animalService.archiveAnimals(action.animalIds).pipe(
          tap(() => this._snackBar.open('Animals archived')),
          withLatestFrom(
            this._store.select(AnimalSelectors.paginationParameters)
          ),
          map(
            ([, params]: [
              number[],
              { pageNumber: number; pageSize: number }
            ]) => new FetchAnimalsAction(params.pageNumber, params.pageSize)
          ),
          catchError((error: HttpErrorResponse) => throwError(error))
        )
      ),
      catchError((error: HttpErrorResponse) => this.handleError(error, actions))
    )
  );

  public unarchiveAnimals$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActionTypes.UnarchiveAnimals),
      switchMap((action: UnarchiveAnimals) =>
        this.animalService.unarchiveAnimals(action.animalIds).pipe(
          tap(() => this._snackBar.open('Animals archived')),
          withLatestFrom(
            this._store.select(AnimalSelectors.paginationParameters)
          ),
          map(
            ([, params]: [void, { pageNumber: number; pageSize: number }]) =>
              new FetchAnimalsAction(params.pageNumber, params.pageSize)
          )
        )
      ),
      catchError((error: HttpErrorResponse) => this.handleError(error, actions))
    )
  );

  public recordAnimalDeath$: Observable<PayloadAction<number | Error>> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(RecordAnimalDeathAction),
        concatMap((action: Action & RecordAnimalDeath) =>
          this.animalService.recordDeath(action).pipe(
            map(() => actions.fetchSingle(action.animalId)),
            catchError((error: HttpErrorResponse) =>
              this.handleError(error, actions)
            )
          )
        )
      )
    );

  public sellAnimal$: Observable<PayloadAction<number | Error>> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SellAnimalAction),
        concatMap((action: Action & SellAnimal) =>
          this.animalService.sell(action).pipe(
            map(() => actions.fetchSingle(action.animalId)),
            catchError((error: HttpErrorResponse) =>
              this.handleError(error, actions)
            )
          )
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
    private readonly _snackBar: MatSnackBar
  ) {
    super(actions$, animalService, actions, AnimalKey, _snackBar);
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<Animal>> => {
    const fetchAction = <FetchAnimalsAction>action;
    return this.animalService.getAll(
      fetchAction.pageSize,
      fetchAction.pageNumber,
      fetchAction.orderOptions,
      fetchAction.includeArchived
    );
  };
}
