import { AnimalTransaction, PagedData } from '@core/models';
import { CrudState, PayloadAction } from '@core/store';
import { crudReducer } from '@core/store/crud';
import { EntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export function animalTransactionReducer<TData extends AnimalTransaction>(
  typeName: string,
  adapter: EntityAdapter<TData>,
  state: CrudState<TData, number>,
  action: Action
): CrudState<TData, number> {
  switch (action.type) {
    case `FETCH_ANIMAL_TRANSACTIONS_${typeName}`:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case `API_FETCH_ANIMAL_TRANSACTIONS_${typeName}`:
      return apiFetchAnimalTransactionsReducer(
        adapter,
        state,
        <PayloadAction<{ animalId: number; data: PagedData<TData> }>>action
      );
    default:
      return crudReducer(typeName, adapter, state, action);
  }
}

function apiFetchAnimalTransactionsReducer<TData extends AnimalTransaction>(
  adapter: EntityAdapter<TData>,
  state: CrudState<TData, number>,
  action: PayloadAction<{ animalId: number; data: PagedData<TData> }>
): CrudState<TData, number> {
  const newState = adapter.setAll(action.payload.data.data, state);
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
    pageNumber: action.payload.data.currentPage,
    pageSize: action.payload.data.pageSize,
    recordCount: action.payload.data.totalRecordCount
  };
}
