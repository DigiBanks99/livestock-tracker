import { SaveState, Unit } from '@core/models';
import { crudReducer, UnitState } from '@core/store';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { UnitKey } from './constants';
import { SelectUnitAction, UnitActionTypes } from './unit.actions';

export const unitAdapter = createEntityAdapter<Unit>({
  selectId: (unit: Unit) => unit.id,
  sortComparer: (left: Unit, right: Unit) =>
    left.description.localeCompare(right.description)
});

export const initialState: UnitState = unitAdapter.getInitialState({
  selectedId: null,
  isPending: false,
  isFetching: false,
  error: null,
  pageSize: 0,
  pageNumber: 0,
  recordCount: 0,
  saveState: SaveState.New
});

export function unitReducer(
  state: UnitState = initialState,
  action: Action
): UnitState {
  switch (action.type) {
    case UnitActionTypes.SelectUnit:
      return {
        ...state,
        selectedId: (<SelectUnitAction>action).typeCode
      };
    default:
      return crudReducer(UnitKey, unitAdapter, state, action);
  }
}
