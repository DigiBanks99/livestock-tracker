import { Unit } from '@core/models/unit.model';
import { UnitState } from '@core/store';
import { crudReducer } from '@core/store/crud.reducer';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { ActionTypes, SelectUnit } from '@unit/store/unit.actions';

import { UnitKey } from './constants';

export const unitAdapter = createEntityAdapter<Unit>({
  selectId: unit => unit.id,
  sortComparer: unit => unit.description
});

export const initialState = unitAdapter.getInitialState({
  selectedId: null,
  isPending: false,
  isFetching: false,
  error: null
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
