import { Injectable } from '@angular/core';
import { Animal } from '@app/core/models/livestock.model';
import { CrudEffects } from '@core/store/crud.effects';
import { AnimalService } from '@animal/services/animal.service';
import { actions } from '@animal/store/animal.actions';
import { Actions } from '@ngrx/effects';

import { AnimalKey } from './constants';

@Injectable()
export class AnimalEffects extends CrudEffects<Animal, number> {
  constructor(protected actions$: Actions, animalService: AnimalService) {
    super(actions$, animalService, actions, AnimalKey);
  }
}
