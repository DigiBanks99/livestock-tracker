import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnimalProviderModule } from '@animal/animal-provider.module';
import { AnimalService } from '@animal/services';
import {
  actions,
  ActionTypes,
  FetchAnimals,
  SelectAnimal
} from '@animal/store/animal.actions';
import { Animal } from '@app/core/models/livestock.model';
import { PagedData } from '@core/models/paged-data.model';
import { PayloadAction } from '@core/store';
import { CrudEffects } from '@core/store/crud.effects';
import { environment } from '@env/environment';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { AnimalKey } from './constants';

@Injectable({
  providedIn: AnimalProviderModule
})
export class AnimalEffects extends CrudEffects<Animal, number, number> {
  constructor(
    protected actions$: Actions,
    protected animalService: AnimalService,
    snackBar: MatSnackBar
  ) {
    super(actions$, animalService, actions, AnimalKey, snackBar);
  }

  public fetchSelectedAnimalDetail$: Observable<
    PayloadAction<number>
  > = createEffect(
    (): Observable<PayloadAction<number>> =>
      this.actions$.pipe(
        ofType(ActionTypes.SELECT_ANIMAL),
        map(
          (action: SelectAnimal): PayloadAction<number> =>
            actions.fetchSingle(action.key)
        )
      )
  );

  protected get defaultFetchAction(): Action {
    return new FetchAnimals(0, environment.pageSize);
  }

  protected handleFetchAction$ = (
    action: Action
  ): Observable<PagedData<Animal>> => {
    const fetchAction = <FetchAnimals>action;
    return this.animalService.getAll(
      fetchAction.pageSize,
      fetchAction.pageNumber
    );
  };
}
