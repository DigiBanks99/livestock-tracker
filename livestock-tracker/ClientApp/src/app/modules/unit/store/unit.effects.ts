import { Injectable } from '@angular/core';
import { Unit } from '@core/models/unit.model';
import { CrudEffects } from '@core/store/crud.effects';
import { Actions } from '@ngrx/effects';
import { UnitService } from '@unit/services/unit.service';
import { actions } from '@unit/store/unit.actions';

import { UnitKey } from './constants';

@Injectable()
export class UnitEffects extends CrudEffects<Unit, number, Unit[]> {
  constructor(protected actions$: Actions, unitService: UnitService) {
    super(actions$, unitService, actions, UnitKey);
  }
}
