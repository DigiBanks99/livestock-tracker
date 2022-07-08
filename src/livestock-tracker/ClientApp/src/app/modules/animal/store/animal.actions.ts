import { AnimalOrderType } from '@animal/enums';
import { Animal, OrderOptions } from '@core/models';
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
  public readonly type = AnimalActionTypes.FetchAnimals;

  constructor(
    public pageNumber: number = 0,
    public pageSize: number = 10,
    public orderOptions?: OrderOptions<AnimalOrderType>,
    public includeArchived?: boolean
  ) {}
}

export class ArchiveAnimals implements Action {
  public readonly type = AnimalActionTypes.ArchiveAnimals;

  constructor(public animalIds: number[]) {}
}

export class UnarchiveAnimals implements Action {
  public readonly type = AnimalActionTypes.UnarchiveAnimals;

  constructor(public animalIds: number[]) {}
}

const crudActions: CrudActions<Animal, number, number> = crudActionsFactory<
  Animal,
  number,
  number
>(AnimalKey);

export const actions: CrudActions<Animal, number, number> = {
  ...crudActions
};
