import { Unit } from '@core/models/unit.model';
import { crudActionsFactory } from '@core/store';
import { PaginationAction } from '@core/store/pagination-action.interface';
import { Action } from '@ngrx/store';

import { UnitKey } from './constants';

export enum UnitActionTypes {
  SelectUnit = 'SELECT_UNIT',
  FetchUnit = 'FETCH_UNIT'
}

export class SelectUnitAction implements Action {
  readonly type = UnitActionTypes.SelectUnit;
  typeCode: number;

  constructor(typeCode: number) {
    this.typeCode = typeCode;
  }
}

export class FetchUnitsAction implements PaginationAction {
  readonly type = UnitActionTypes.FetchUnit;
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
