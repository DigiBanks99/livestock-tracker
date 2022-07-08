import { KeyValue } from '@angular/common';
import { KeyEntity } from '@core/models/key-entity.interface';
import { PagedData } from '@core/models/paged-data.model';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export interface PayloadAction<TData> extends Action {
  payload: TData;
}

export interface CrudActions<
  TData extends KeyEntity<TKey>,
  TKey,
  TFetchSinglePayload
> {
  addItem: (item: TData) => PayloadAction<TData>;
  apiAddItem: (item: TData) => PayloadAction<TData>;
  updateItem: (item: TData, key: TKey) => PayloadAction<KeyValue<TKey, TData>>;
  apiUpdateItem: (
    item: Update<TData>,
    key: TKey
  ) => PayloadAction<KeyValue<TKey, Update<TData>>>;
  deleteItem: (key: TKey) => PayloadAction<TKey>;
  apiDeleteItem: (key: TKey) => PayloadAction<TKey>;
  fetchItems: () => Action;
  fetchSingle: (key: TFetchSinglePayload) => PayloadAction<TFetchSinglePayload>;
  apiFetchSingle: (item: TData) => PayloadAction<TData>;
  apiError: (error: Error) => PayloadAction<Error>;
  apiFetchItems: (data: PagedData<TData>) => PayloadAction<PagedData<TData>>;
  resetSaveState: () => Action;
  selectItem: (key: TKey) => PayloadAction<TKey>;
}

function addItem<TData>(item: TData, typeName: string): PayloadAction<TData> {
  return {
    type: `ADD_${typeName}`,
    payload: item
  };
}

function apiAddItem<TData>(
  item: TData,
  typeName: string
): PayloadAction<TData> {
  return {
    type: `API_ADD_${typeName}`,
    payload: item
  };
}

function updateItem<TData, TKey>(
  item: TData,
  key: TKey,
  typeName: string
): PayloadAction<KeyValue<TKey, TData>> {
  return {
    type: `UPDATE_${typeName}`,
    payload: {
      key,
      value: item
    }
  };
}

function apiUpdateItem<TData, TKey>(
  item: Update<TData>,
  key: TKey,
  typeName: string
): PayloadAction<KeyValue<TKey, Update<TData>>> {
  return {
    type: `API_UPDATE_${typeName}`,
    payload: {
      key,
      value: item
    }
  };
}

function deleteItem<TKey>(key: TKey, typeName: string): PayloadAction<TKey> {
  return {
    type: `DELETE_${typeName}`,
    payload: key
  };
}

function apiDeleteItem<TKey>(key: TKey, typeName: string): PayloadAction<TKey> {
  return {
    type: `API_DELETE_${typeName}`,
    payload: key
  };
}

function fetchItems(typeName: string): Action {
  return {
    type: `FETCH_${typeName}`
  };
}

function apiFetchItems<TData>(
  data: PagedData<TData>,
  typeName: string
): PayloadAction<PagedData<TData>> {
  return {
    type: `API_FETCH_${typeName}`,
    payload: data
  };
}

function fetchSingle<TKey>(
  payload: TKey,
  typeName: string
): PayloadAction<TKey> {
  return {
    type: `FETCH_SINGLE_${typeName}`,
    payload
  };
}

function apiFetchSingle<TEntity>(
  item: TEntity,
  typeName: string
): PayloadAction<TEntity> {
  return {
    type: `API_FETCH_SINGLE_${typeName}`,
    payload: item
  };
}

function apiError(error: Error, typeName: string): PayloadAction<Error> {
  return {
    type: `API_ERROR_${typeName}`,
    payload: error
  };
}

function resetSaveState(typeName: string): Action {
  return {
    type: `RESET_SAVE_STATE_${typeName}`
  };
}

function selectItem<TKey>(key: TKey, typeName: string): PayloadAction<TKey> {
  return {
    type: `SELECT_${typeName}`,
    payload: key
  };
}

export function crudActionsFactory<
  TData extends KeyEntity<TKey>,
  TKey,
  TFetchSinglePayload
>(typeName: string): CrudActions<TData, TKey, TFetchSinglePayload> {
  return {
    addItem: (item: TData): PayloadAction<TData> => addItem(item, typeName),
    apiAddItem: (item: TData): PayloadAction<TData> =>
      apiAddItem(item, typeName),
    updateItem: (
      item: TData,
      key: TKey
    ): PayloadAction<KeyValue<TKey, TData>> => updateItem(item, key, typeName),
    apiUpdateItem: (
      item: Update<TData>,
      key: TKey
    ): PayloadAction<KeyValue<TKey, Update<TData>>> =>
      apiUpdateItem(item, key, typeName),
    deleteItem: (key: TKey): PayloadAction<TKey> => deleteItem(key, typeName),
    apiDeleteItem: (key: TKey): PayloadAction<TKey> =>
      apiDeleteItem(key, typeName),
    fetchItems: (): Action => fetchItems(typeName),
    fetchSingle: (
      key: TFetchSinglePayload
    ): PayloadAction<TFetchSinglePayload> => fetchSingle(key, typeName),
    apiFetchSingle: (item: TData): PayloadAction<TData> =>
      apiFetchSingle(item, typeName),
    apiFetchItems: (data: PagedData<TData>): PayloadAction<PagedData<TData>> =>
      apiFetchItems(data, typeName),
    apiError: (error: Error): PayloadAction<Error> => apiError(error, typeName),
    resetSaveState: (): Action => resetSaveState(typeName),
    selectItem: (key: TKey): PayloadAction<TKey> => selectItem(key, typeName)
  };
}
