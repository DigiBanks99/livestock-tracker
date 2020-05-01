import { Unit } from '@core/models/unit.model';
import { crudActionsFactory } from '@core/store';
import { PaginationAction } from '@core/store/pagination-action.interface';
import { Action } from '@ngrx/store';

import { UnitKey } from './constants';

export enum ActionTypes {
  SELECT_UNIT = 'SELECT_UNIT',
  FETCH_UNIT = 'FETCH_UNIT',
}

export class SelectUnit implements Action {
  readonly type = ActionTypes.SELECT_UNIT;
  typeCode: number;

  constructor(typeCode: number) {
    this.typeCode = typeCode;
  }
}

export class FetchUnits implements PaginationAction {
  readonly type = ActionTypes.FETCH_UNIT;
  pageNumber: number;
  pageSize: number;
  includeDeleted: boolean;

  constructor(
    pageNumber: number = 0,
    pageSize: number = 100,
    includeDeleted: boolean = false
  ) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.includeDeleted = includeDeleted;
  }
}

export const actions = crudActionsFactory<Unit, number>(UnitKey);
