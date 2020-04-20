import { Animal } from '@core/models';
import { PagedData } from '@core/models/paged-data.model';
import { CrudActions, crudActionsFactory, PayloadAction } from '@core/store';
import { Action } from '@ngrx/store';

import { AnimalKey } from './constants';

export enum ActionTypes {
  SELECT_ANIMAL = 'SELECT_ANIMAL',
  FETCH_ANIMALS = 'FETCH_ANIMAL',
  API_FETCH_ANIMAL = 'API_FETCH_ANIMAL',
  SELECT_ANIMAL_PAGE = 'SELECT_ANIMAL_PAGE',
}

export class SelectAnimal implements Action {
  readonly type = ActionTypes.SELECT_ANIMAL;
  key: number;

  constructor(id: number) {
    this.key = id;
  }
}

export class FetchAnimals implements Action {
  readonly type = ActionTypes.FETCH_ANIMALS;
  pageNumber: number;
  pageSize: number;

  constructor(pageNumber: number = 0, pageSize: number = 10) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}

const crudActions = crudActionsFactory<Animal, number>(AnimalKey);

function apiFetchItems<TData>(data: TData): PayloadAction<TData> {
  return crudActions.apiFetchItems(data);
}
export const actions: CrudActions<Animal, number> = {
  ...crudActions,
  apiFetchItems,
};
