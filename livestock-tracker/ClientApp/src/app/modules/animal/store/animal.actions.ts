import { Animal } from '@core/models';
import { CrudActions, crudActionsFactory, PayloadAction } from '@core/store';
import { Action } from '@ngrx/store';

import { AnimalKey } from './constants';

export enum ActionTypes {
  SELECT_ANIMAL = 'SELECT_ANIMAL'
}

export class SelectAnimal implements Action {
  readonly type = ActionTypes.SELECT_ANIMAL;
  key: number;

  constructor(id: number) {
    this.key = id;
  }
}

const crudActions = crudActionsFactory<Animal, number>(AnimalKey);

export const actions: CrudActions<Animal, number> = {
  ...crudActions,
  apiFetchItems: (items: Animal[]): PayloadAction<Animal[]> => {
    return crudActions.apiFetchItems(items);
  }
};
