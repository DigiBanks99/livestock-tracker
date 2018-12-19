import { Action } from '@ngrx/store';
import { Livestock } from '@livestock/livestock.model';

export enum ActionTypes {
  ADD_ANIMAL = 'ADD_ANIMAL',
  REMOVE_ANIMAL = 'REMOVE_ANIMAL',
  SELECT_ANIMAL = 'SELECT_ANIMAL',
  FETCH_ANIMALS = 'FETCH_ANIMALS',
  SET_ANIMALS = 'SET_ANIMALS',
  HANDLE_FETCH_ANIMALS_ERROR = 'HANDLE_FETCH_ANIMALS_ERROR'
}

export class AddAnimal implements Action {
  readonly type = ActionTypes.ADD_ANIMAL;
  animal: Livestock;
}

export class RemoveAnimal implements Action {
  readonly type = ActionTypes.REMOVE_ANIMAL;
  key: number;
}

export class SelectAnimal implements Action {
  readonly type = ActionTypes.SELECT_ANIMAL;
  key: number;
}

export class FetchAnimals implements Action {
  readonly type = ActionTypes.FETCH_ANIMALS;
}

export class SetAnimals implements Action {
  readonly type = ActionTypes.SET_ANIMALS;
  animals: Livestock[];

  constructor(animals: Livestock[]) {
    this.animals = animals;
  }
}

export class HandleFetchAnimalsError implements Action {
  readonly type = ActionTypes.HANDLE_FETCH_ANIMALS_ERROR;
  error: Error;

  constructor(error: Error) {
    this.error = error;
  }
}
