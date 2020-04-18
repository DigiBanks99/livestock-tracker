import { Injectable } from '@angular/core';
import { AnimalService } from '@animal/services/animal.service';
import { actions } from '@animal/store/animal.actions';
import { Animal } from '@app/core/models/livestock.model';
import { PagedData } from '@core/models/paged-data.model';
import { CrudEffects } from '@core/store/crud.effects';
import { Actions } from '@ngrx/effects';

import { AnimalKey } from './constants';

@Injectable()
export class AnimalEffects extends CrudEffects<
  Animal,
  number,
  PagedData<Animal>
> {
  constructor(protected actions$: Actions, animalService: AnimalService) {
    super(actions$, animalService, actions, AnimalKey);
  }
}
