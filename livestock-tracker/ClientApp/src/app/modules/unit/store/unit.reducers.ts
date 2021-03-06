import { SaveState } from '@core/models';
import { Unit } from '@core/models/unit.model';
import { UnitState } from '@core/store';
import { crudReducer } from '@core/store/crud.reducer';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { ActionTypes, SelectUnit } from '@unit/store/unit.actions';

import { UnitKey } from './constants';

export const unitAdapter = createEntityAdapter<Unit>({
  selectId: (unit) => unit.id,
  sortComparer: (unit) => unit.description
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
    case ActionTypes.SELECT_UNIT:
      return {
        ...state,
        selectedId: (<SelectUnit>action).typeCode
      };
    default:
      return crudReducer(UnitKey, unitAdapter, state, action);
  }
}
