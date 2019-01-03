import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Unit } from '@unit/unit.model';

export enum ActionTypes {
  ADD_UNIT = 'ADD_UNIT',
  ADD_UNIT_SUCCESS = 'ADD_UNIT_SUCCESS',
  UPDATE_UNIT = 'UPDATE_UNIT',
  UPDATE_UNIT_SUCCESS = 'UPDATE_UNIT_SUCCESS',
  REMOVE_UNIT = 'REMOVE_UNIT',
  REMOVE_UNIT_SUCCESS = 'REMOVE_UNIT_SUCCESS',
  FETCH_UNITS = 'FETCH_UNITS',
  SET_UNITS = 'SET_UNITS',
  SELECT_UNIT = 'SELECT_UNIT',
  UNIT_ERROR = 'UNIT_ERROR'
}

export class AddUnit implements Action {
  readonly type = ActionTypes.ADD_UNIT;
  unit: Unit;

  constructor(unit: Unit) {
    this.unit = unit;
  }
}

export class AddUnitSuccess implements Action {
  readonly type = ActionTypes.ADD_UNIT_SUCCESS;
  unit: Unit;

  constructor(unit: Unit) {
    this.unit = unit;
  }
}

export class UpdateUnit implements Action {
  readonly type = ActionTypes.UPDATE_UNIT;
  unit: Unit;

  constructor(unit: Unit) {
    this.unit = unit;
  }
}

export class UpdateUnitSuccess implements Action {
  readonly type = ActionTypes.UPDATE_UNIT_SUCCESS;
  unit: Update<Unit>;

  constructor(unit: Update<Unit>) {
    this.unit = unit;
  }
}

export class RemoveUnit implements Action {
  readonly type = ActionTypes.REMOVE_UNIT;
  typeCode: number;

  constructor(typeCode: number) {
    this.typeCode = typeCode;
  }
}

export class RemoveUnitSuccess implements Action {
  readonly type = ActionTypes.REMOVE_UNIT_SUCCESS;
  typeCode: number;

  constructor(typeCode: number) {
    this.typeCode = typeCode;
  }
}

export class FetchUnits implements Action {
  readonly type = ActionTypes.FETCH_UNITS;
}

export class SetUnits implements Action {
  readonly type = ActionTypes.SET_UNITS;
  units: Unit[];

  constructor(units: Unit[]) {
    this.units = units;
  }
}

export class SelectUnit implements Action {
  readonly type = ActionTypes.SELECT_UNIT;
  typeCode: number;

  constructor(typeCode: number) {
    this.typeCode = typeCode;
  }
}

export class UnitError implements Action {
  readonly type = ActionTypes.UNIT_ERROR;
  error?: Error;

  constructor(error: Error) {
    this.error = error;
  }
}
