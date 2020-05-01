import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { AnimalService } from '@animal/services/animal.service';
import { actions, FetchAnimals } from '@animal/store/animal.actions';
import { Animal } from '@app/core/models/livestock.model';
import { PagedData } from '@core/models/paged-data.model';
import { CrudEffects } from '@core/store/crud.effects';
import { environment } from '@env/environment';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { AnimalKey } from './constants';

@Injectable()
export class AnimalEffects extends CrudEffects<Animal, number, number> {
  constructor(
    protected actions$: Actions,
    protected animalService: AnimalService
  ) {
    super(actions$, animalService, actions, AnimalKey, true);
  }

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
