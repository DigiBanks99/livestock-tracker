import { Animal } from '@core/models';
import { CrudActions, crudActionsFactory, PayloadAction } from '@core/store';
import { Action } from '@ngrx/store';

import { AnimalActionTypes } from './animal.action-types';
import { AnimalKey } from './constants';

export class SelectAnimalAction implements PayloadAction<number> {
  readonly type = AnimalActionTypes.SelectAnimal;
  public readonly key: number;
  public readonly payload: number;

  constructor(id: number) {
    this.key = id;
    this.payload = id;
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
