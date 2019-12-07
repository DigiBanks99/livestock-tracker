import { KeyValue } from '@angular/common';
import { EntityAdapter, Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { PayloadAction } from './';
import { CrudState } from './crud-state.interface';

export function crudReducer<T, K>(
  typeName: string,
  adapter: EntityAdapter<T>,
  state: CrudState<T, K>,
  action: Action
) {
  switch (action.type) {
    case `ADD_${typeName}`:
    case `UPDATE_${typeName}`:
    case `DELETE_${typeName}`:
    case `FETCH_${typeName}`:
      return {
        isPending: true,
        error: null,
        ...state
      };
    case `API_ADD_${typeName}`:
      const addAction = <PayloadAction<T>>action;
      return {
        ...addApiReducer(adapter, state, addAction)
      };
    case `API_UPDATE_${typeName}`:
      const updateAction = <PayloadAction<KeyValue<K, Update<T>>>>action;
      return {
        ...updateApiReducer(adapter, state, updateAction)
      };
    case `API_DELETE_${typeName}`:
      const deleteAction = <PayloadAction<K>>action;
      return {
        ...deleteApiReducer(adapter, state, deleteAction)
      };
    case `API_FETCH_${typeName}`:
      const fetchAction = <PayloadAction<T[]>>action;
      return {
        ...fetchApiReducer(adapter, state, fetchAction)
      };
    case `API_ERROR_${typeName}`:
      const errorAction = <PayloadAction<Error>>action;
      return {
        error: errorAction.payload,
        isPending: false,
        ...state
      };
    default:
      return state;
  }
}

function addApiReducer<T, K>(
  adapter: EntityAdapter<T>,
  state: CrudState<T, K>,
  action: PayloadAction<T>
): CrudState<T, K> {
  const newState = adapter.addOne(action.payload, state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}

function updateApiReducer<T, K>(
  adapter: EntityAdapter<T>,
  state: CrudState<T, K>,
  action: PayloadAction<KeyValue<K, Update<T>>>
): CrudState<T, K> {
  const newState = adapter.updateOne(action.payload.value, state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}

function deleteApiReducer<T, K>(
  adapter: EntityAdapter<T>,
  state: CrudState<T, K>,
  action: PayloadAction<K>
): CrudState<T, K> {
  const newState = adapter.removeOne(String(action.payload), state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}

function fetchApiReducer<T, K>(
  adapter: EntityAdapter<T>,
  state: CrudState<T, K>,
  action: PayloadAction<T[]>
): CrudState<T, K> {
  const newState = adapter.addAll(action.payload, state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}
