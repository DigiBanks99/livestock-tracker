import { Animal } from '@core/models';
import { CrudActions, crudActionsFactory } from '@core/store';
import { Action } from '@ngrx/store';

import { AnimalKey } from './constants';

export enum AnimalActionTypes {
  SelectAnimal = 'SELECT_ANIMAL',
  FetchAnimals = 'FETCH_ANIMAL',
  FetchSingleAnimal = 'FETCH_SINGLE_ANIMAL',
  ApiFetchAnimal = 'API_FETCH_ANIMAL',
  SelectAnimalPage = 'SELECT_ANIMAL_PAGE'
}

export class SelectAnimalAction implements Action {
  readonly type = AnimalActionTypes.SelectAnimal;
  key: number;

  constructor(id: number) {
    this.key = id;
  }
}

export class FetchAnimalsAction implements Action {
  readonly type = AnimalActionTypes.FetchAnimals;
  pageNumber: number;
  pageSize: number;

  constructor(pageNumber: number = 0, pageSize: number = 10) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}

const crudActions: CrudActions<Animal, number> = crudActionsFactory<
  Animal,
  number
>(AnimalKey);

export const actions: CrudActions<Animal, number> = {
  ...crudActions
};
