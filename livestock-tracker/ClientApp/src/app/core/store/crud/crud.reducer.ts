import { KeyValue } from '@angular/common';
import { SaveState } from '@core/models';
import { KeyEntity } from '@core/models/key-entity.interface';
import { PagedData } from '@core/models/paged-data.model';
import { EntityAdapter, Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { PayloadAction } from './';
import { CrudState } from './crud-state.interface';

export function crudReducer<TData extends KeyEntity<TKey>, TKey>(
  typeName: string,
  adapter: EntityAdapter<TData>,
  state: CrudState<TData, TKey>,
  action: Action
) {
  switch (action.type) {
    case `ADD_${typeName}`:
    case `UPDATE_${typeName}`:
      return {
        ...state,
        isPending: true,
        error: null,
        saveState: SaveState.Saving
      };
    case `DELETE_${typeName}`:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case `FETCH_${typeName}`:
    case `FETCH_SINGLE_${typeName}`:
      return {
        ...state,
        isPending: true,
        isFetching: true,
        error: null
      };
    case `API_ADD_${typeName}`:
      const addAction = <PayloadAction<TData>>action;
      return {
        ...addApiReducer(adapter, state, addAction)
      };
    case `API_UPDATE_${typeName}`:
      const updateAction = <PayloadAction<KeyValue<TKey, Update<TData>>>>action;
      return {
        ...updateApiReducer(adapter, state, updateAction)
      };
    case `API_DELETE_${typeName}`:
      const deleteAction = <PayloadAction<TKey>>action;
      return {
        ...deleteApiReducer(adapter, state, deleteAction)
      };
    case `API_FETCH_${typeName}`:
      const fetchAction = <PayloadAction<PagedData<TData>>>action;
      return {
        ...fetchApiReducer(adapter, state, fetchAction)
      };
    case `API_FETCH_SINGLE_${typeName}`:
      const fetchSingleAction = <PayloadAction<TData>>action;
      return {
        ...fetchSingleApiReducer(adapter, state, fetchSingleAction)
      };
    case `API_ERROR_${typeName}`:
      const errorAction = <PayloadAction<Error>>action;
      return {
        ...state,
        error: errorAction.payload,
        isPending: false,
        isFetching: false
      };
    case `RESET_SAVE_STATE_${typeName}`:
      return {
        ...state,
        saveState: SaveState.New
      };
    case `SELECT_${typeName}`:
      return {
        ...state,
        selectedId: (<PayloadAction<TKey>>action).payload
      };
    default:
      return state;
  }
}

function addApiReducer<TData extends KeyEntity<TKey>, TKey>(
  adapter: EntityAdapter<TData>,
  state: CrudState<TData, TKey>,
  action: PayloadAction<TData>
): CrudState<TData, TKey> {
  const newState = adapter.addOne(action.payload, state);
  return {
    ...newState,
    selectedId: action.payload.id,
    isPending: false,
    saveState: SaveState.Success,
    error: null
  };
}

function updateApiReducer<TData extends KeyEntity<TKey>, TKey>(
  adapter: EntityAdapter<TData>,
  state: CrudState<TData, TKey>,
  action: PayloadAction<KeyValue<TKey, Update<TData>>>
): CrudState<TData, TKey> {
  const newState = adapter.updateOne(action.payload.value, state);
  return {
    ...newState,
    selectedId: action.payload.key,
    isPending: false,
    error: null,
    saveState: SaveState.Success
  };
}

function deleteApiReducer<TData extends KeyEntity<TKey>, TKey>(
  adapter: EntityAdapter<TData>,
  state: CrudState<TData, TKey>,
  action: PayloadAction<TKey>
): CrudState<TData, TKey> {
  const idx = state.ids.findIndex((id) => id === action.payload);
  const newState = adapter.removeOne(String(action.payload), state);
  const newIdx = idx <= 0 ? 0 : idx - 1;
  const newId = newState.ids[newIdx];
  const selectedId = newState.entities[newId]
    ? newState.entities[newId].id
    : null;
  return {
    ...newState,
    selectedId,
    isPending: false,
    error: null
  };
}

function fetchApiReducer<TData extends KeyEntity<TKey>, TKey>(
  adapter: EntityAdapter<TData>,
  state: CrudState<TData, TKey>,
  action: PayloadAction<PagedData<TData>>
): CrudState<TData, TKey> {
  const newState = adapter.setAll(action.payload.data, state);
  const idAsString = String(newState.selectedId);
  const ids = <string[]>newState.ids || [];
  const selectedIndex = ids.findIndex((id: string) => id === idAsString);
  const selectedId =
    selectedIndex > -1
      ? newState.selectedId
      : ids.length > 0
      ? newState.entities[ids[0]].id
      : null;
  return {
    ...newState,
    selectedId,
    isPending: false,
    isFetching: false,
    error: null,
    pageNumber: action.payload.currentPage,
    pageSize: action.payload.pageSize,
    recordCount: action.payload.totalRecordCount
  };
}

function fetchSingleApiReducer<TData extends KeyEntity<TKey>, TKey>(
  adapter: EntityAdapter<TData>,
  state: CrudState<TData, TKey>,
  action: PayloadAction<TData>
): CrudState<TData, TKey> {
  const newState = adapter.upsertOne(action.payload, state);
  const selectedId = action.payload.id;
  return {
    ...newState,
    selectedId,
    isPending: false,
    isFetching: false,
    error: null
  };
}
