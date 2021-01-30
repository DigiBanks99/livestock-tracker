import { Animal } from '@core/models';
import { CrudActions, crudActionsFactory } from '@core/store';
import { Action } from '@ngrx/store';

import { AnimalKey } from './constants';

export enum ActionTypes {
  SELECT_ANIMAL = 'SELECT_ANIMAL',
  FETCH_ANIMALS = 'FETCH_ANIMAL',
  FETCH_SINGLE_ANIMAL = 'FETCH_SINGLE_ANIMAL',
  API_FETCH_ANIMAL = 'API_FETCH_ANIMAL',
  SELECT_ANIMAL_PAGE = 'SELECT_ANIMAL_PAGE'
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

const crudActions: CrudActions<Animal, number> = crudActionsFactory<
  Animal,
  number
>(AnimalKey);

export const actions: CrudActions<Animal, number> = {
  ...crudActions
};
