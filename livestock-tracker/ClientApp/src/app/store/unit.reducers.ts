import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Unit } from '@unit/unit.model';
import { Action } from '@ngrx/store';
import {
  ActionTypes,
  AddUnitSuccess,
  RemoveUnitSuccess,
  UpdateUnitSuccess,
  SetUnits,
  SelectUnit,
  UnitError
} from './unit.actions';

export interface UnitState extends EntityState<Unit> {
  selectedUnitId: number;
  isPending: boolean;
  error?: Error;
}

export const unitAdapter = createEntityAdapter<Unit>({
  selectId: unit => unit.typeCode,
  sortComparer: unit => unit.description
});

export const initialState = unitAdapter.getInitialState({
  selectedUnitId: null,
  isPending: false,
  error: null
});

export function unitReducer(state: UnitState = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.ADD_UNIT:
    case ActionTypes.FETCH_UNITS:
    case ActionTypes.REMOVE_UNIT:
    case ActionTypes.UPDATE_UNIT:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case ActionTypes.ADD_UNIT_SUCCESS:
      return {
        ...addOne(state, <AddUnitSuccess>action)
      };
    case ActionTypes.REMOVE_UNIT_SUCCESS:
      return {
        ...removeOne(state, <RemoveUnitSuccess>action)
      };
    case ActionTypes.UPDATE_UNIT_SUCCESS:
      return {
        ...updateOne(state, <UpdateUnitSuccess>action)
      };
    case ActionTypes.SET_UNITS:
      return {
        ...setAll(state, <SetUnits>action)
      };
    case ActionTypes.SELECT_UNIT:
      return {
        ...state,
        selectedUnitId: (<SelectUnit>action).typeCode
      };
    case ActionTypes.UNIT_ERROR:
      return {
        ...state,
        error: (<UnitError>action).error
      };
    default:
      return state;
  }
}

function addOne(state: UnitState, action: AddUnitSuccess): UnitState {
  const newState = unitAdapter.addOne(action.unit, state);
  return {
    ...newState,
    isPending: false,
    error: null
  };
}

function removeOne(state: UnitState, action: RemoveUnitSuccess): UnitState {
  const newState = unitAdapter.removeOne(action.typeCode, state);
  return {
    ...newState,
    isPending: false,
    error: null
  };
}

function updateOne(state: UnitState, action: UpdateUnitSuccess): UnitState {
  const newState = unitAdapter.updateOne(action.unit, state);
  return {
    ...newState,
    isPending: false,
    error: null
  };
}

function setAll(state: UnitState, action: SetUnits): UnitState {
  const newState = unitAdapter.addAll(action.units, state);
  return {
    ...newState,
    isPending: false,
    error: null
  };
}
