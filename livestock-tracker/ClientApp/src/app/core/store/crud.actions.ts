import { KeyValue } from '@angular/common';
import { KeyEntity } from '@core/models/key-entity.interface';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export interface PayloadAction<T> extends Action {
  payload: T;
}

export interface CrudActions<T extends KeyEntity<K>, K> {
  addItem: (item: T) => PayloadAction<T>;
  apiAddItem: (item: T) => PayloadAction<T>;
  updateItem: (item: T, key: K) => PayloadAction<KeyValue<K, T>>;
  apiUpdateItem: (
    item: Update<T>,
    key: K
  ) => PayloadAction<KeyValue<K, Update<T>>>;
  deleteItem: (key: K) => PayloadAction<K>;
  apiDeleteItem: (key: K) => PayloadAction<K>;
  fetchItems: () => Action;
  apiFetchItems: (items: T[]) => PayloadAction<T[]>;
  apiError: (error: Error) => PayloadAction<Error>;
}

function addItem<T>(item: T, typeName: string): PayloadAction<T> {
  return {
    type: `ADD_${typeName}`,
    payload: item
  };
}

function apiAddItem<T>(item: T, typeName: string): PayloadAction<T> {
  return {
    type: `API_ADD_${typeName}`,
    payload: item
  };
}

function updateItem<T, K>(
  item: T,
  key: K,
  typeName: string
): PayloadAction<KeyValue<K, T>> {
  return {
    type: `UPDATE_${typeName}`,
    payload: {
      key,
      value: item
    }
  };
}

function apiUpdateItem<T, K>(
  item: Update<T>,
  key: K,
  typeName: string
): PayloadAction<KeyValue<K, Update<T>>> {
  return {
    type: `API_UPDATE_${typeName}`,
    payload: {
      key,
      value: item
    }
  };
}

function deleteItem<K>(key: K, typeName: string): PayloadAction<K> {
  return {
    type: `DELETE_${typeName}`,
    payload: key
  };
}

function apiDeleteItem<K>(key: K, typeName: string): PayloadAction<K> {
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

function apiFetchItems<T>(items: T[], typeName: string): PayloadAction<T[]> {
  return {
    type: `API_FETCH_${typeName}`,
    payload: items
  };
}

function apiError(error: Error, typeName: string): PayloadAction<Error> {
  return {
    type: `API_ERROR_${typeName}`,
    payload: error
  };
}

export function crudActionsFactory<T extends KeyEntity<K>, K>(
  typeName: string
): CrudActions<T, K> {
  return {
    addItem: (item: T): PayloadAction<T> => addItem(item, typeName),
    apiAddItem: (item: T): PayloadAction<T> => apiAddItem(item, typeName),
    updateItem: (item: T, key: K): PayloadAction<KeyValue<K, T>> =>
      updateItem(item, key, typeName),
    apiUpdateItem: (
      item: Update<T>,
      key: K
    ): PayloadAction<KeyValue<K, Update<T>>> =>
      apiUpdateItem(item, key, typeName),
    deleteItem: (key: K): PayloadAction<K> => deleteItem(key, typeName),
    apiDeleteItem: (key: K): PayloadAction<K> => apiDeleteItem(key, typeName),
    fetchItems: (): Action => fetchItems(typeName),
    apiFetchItems: (items: T[]): PayloadAction<T[]> =>
      apiFetchItems(items, typeName),
    apiError: (error: Error): PayloadAction<Error> => apiError(error, typeName)
  };
}
