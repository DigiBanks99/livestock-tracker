import { PageEvent } from '@angular/material/paginator';
import { AnimalTransaction, PagedData } from '@core/models';
import {
  CrudActions,
  crudActionsFactory,
  PayloadAction
} from '@core/store/crud';

export interface FetchAnimalTransactionActions<TData extends AnimalTransaction>
  extends CrudActions<TData, number, { id: number; animalId: number }> {
  fetchAnimalTransactions: (
    pageNumber: number,
    pageSize: number
  ) => PayloadAction<PageEvent>;
  apiFetchAnimalTransactions: (
    animalId: number,
    data: PagedData<TData>
  ) => PayloadAction<{ animalId: number; data: PagedData<TData> }>;
}

function fetchAnimalTransactions(
  pageNumber: number,
  pageSize: number,
  typeName: string
): PayloadAction<PageEvent> {
  return {
    type: `FETCH_ANIMAL_TRANSACTIONS_${typeName}`,
    payload: {
      length: 0,
      pageSize,
      pageIndex: pageNumber
    }
  };
}

function apiFetchAnimalTransactions<TData>(
  animalId: number,
  data: PagedData<TData>,
  typeName: string
): PayloadAction<{ animalId: number; data: PagedData<TData> }> {
  return {
    type: `API_FETCH_ANIMAL_TRANSACTIONS_${typeName}`,
    payload: {
      animalId,
      data
    }
  };
}

export function fetchAnimalTransactionsActionFactory<
  TData extends AnimalTransaction
>(typeName: string): FetchAnimalTransactionActions<TData> {
  return {
    ...crudActionsFactory(typeName),
    fetchAnimalTransactions: (pageNumber: number, pageSize: number) =>
      fetchAnimalTransactions(pageNumber, pageSize, typeName),
    apiFetchAnimalTransactions: (animalId: number, data: PagedData<TData>) =>
      apiFetchAnimalTransactions(animalId, data, typeName)
  };
}
