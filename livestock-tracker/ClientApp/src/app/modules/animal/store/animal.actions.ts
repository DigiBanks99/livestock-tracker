import { Animal } from '@core/models';
import { PagedData } from '@core/models/paged-data.model';
import { CrudActions, crudActionsFactory, PayloadAction } from '@core/store';
import { Action } from '@ngrx/store';

import { AnimalKey } from './constants';

export enum ActionTypes {
  SELECT_ANIMAL = 'SELECT_ANIMAL',
  API_FETCH_ANIMAL = 'API_FETCH_ANIMAL',
}

export class SelectAnimal implements Action {
  readonly type = ActionTypes.SELECT_ANIMAL;
  key: number;

  constructor(id: number) {
    this.key = id;
  }
}

const crudActions = crudActionsFactory<Animal, number>(AnimalKey);

function apiFetchItems<TData>(data: TData): PayloadAction<TData> {
  return crudActions.apiFetchItems(data);
}

apiFetchItems<PagedData<Animal>>({
  currentPage: 1,
  data: [],
  pageCount: 1,
  pageSize: 10,
  totalRecordCount: 7,
});

export const actions: CrudActions<Animal, number> = {
  ...crudActions,
  apiFetchItems,
};
