import { Unit } from '@core/models/unit.model';
import { crudActionsFactory } from '@core/store';
import { Action } from '@ngrx/store';

import { UnitKey } from './constants';

export enum ActionTypes {
  SELECT_UNIT = 'SELECT_UNIT'
}

export class SelectUnit implements Action {
  readonly type = ActionTypes.SELECT_UNIT;
  typeCode: number;

  constructor(typeCode: number) {
    this.typeCode = typeCode;
  }
}

export const actions = crudActionsFactory<Unit, number>(UnitKey);
