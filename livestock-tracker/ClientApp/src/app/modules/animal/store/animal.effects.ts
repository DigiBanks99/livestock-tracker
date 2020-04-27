import { Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AnimalService } from '@animal/services/animal.service';
import {
  actions,
  ActionTypes,
  FetchAnimals
} from '@animal/store/animal.actions';
import { Animal } from '@app/core/models/livestock.model';
import { PagedData } from '@core/models/paged-data.model';
import { CrudEffects } from '@core/store/crud.effects';
import { environment } from '@env/environment';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { AnimalKey } from './constants';

@Injectable()
export class AnimalEffects extends CrudEffects<
  Animal,
  number,
  PagedData<Animal>,
  number
> {
  constructor(
    protected actions$: Actions,
    protected animalService: AnimalService
  ) {
    super(actions$, animalService, actions, AnimalKey);
  }

  public getAll$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.FETCH_ANIMALS),
      startWith(new FetchAnimals(0, environment.pageSize)),
      switchMap((action: FetchAnimals) =>
        this.animalService.getAll(action.pageSize, action.pageNumber)
      ),
      map((data: PagedData<Animal>) => actions.apiFetchItems(data)),
      catchError((error) => this.handleError(error, actions))
    )
  );
}
