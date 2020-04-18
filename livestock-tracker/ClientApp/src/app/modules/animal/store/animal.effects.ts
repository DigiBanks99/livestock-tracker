import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AnimalService } from '@animal/services/animal.service';
import {
  actions,
  ActionTypes,
  FetchAnimal,
} from '@animal/store/animal.actions';
import { Animal } from '@app/core/models/livestock.model';
import { PagedData } from '@core/models/paged-data.model';
import { CrudEffects } from '@core/store/crud.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { AnimalKey } from './constants';

@Injectable()
export class AnimalEffects extends CrudEffects<
  Animal,
  number,
  PagedData<Animal>
> {
  constructor(
    protected actions$: Actions,
    protected animalService: AnimalService
  ) {
    super(actions$, animalService, actions, AnimalKey);
  }

  public getAll$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.FETCH_ANIMAL),
      switchMap((action: FetchAnimal) =>
        this.animalService.getAll(action.pageSize, action.pageNumber + 1)
      ),
      map((data: PagedData<Animal>) => actions.apiFetchItems(data)),
      catchError((error) => this.handleError(error, actions))
    )
  );
}
