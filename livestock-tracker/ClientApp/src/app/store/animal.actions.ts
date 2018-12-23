import { Action } from '@ngrx/store';
import { Livestock } from '@livestock/livestock.model';
import { Update } from '@ngrx/entity';

export enum ActionTypes {
  ADD_ANIMAL = 'ADD_ANIMAL',
  ADD_ANIMAL_SUCCESS = 'ADD_ANIMAL_SUCCESS',
  REMOVE_ANIMAL = 'REMOVE_ANIMAL',
  REMOVE_ANIMAL_SUCCESS = 'REMOVE_ANIMAL_SUCCESS',
  UPDATE_ANIMAL = 'UPDATE_ANIMAL',
  UPDATE_ANIMAL_SUCCESS = 'UPDATE_ANIMAL_SUCCESS',
  SELECT_ANIMAL = 'SELECT_ANIMAL',
  FETCH_ANIMALS = 'FETCH_ANIMALS',
  SET_ANIMALS = 'SET_ANIMALS',
  HANDLE_FETCH_ANIMALS_ERROR = 'HANDLE_FETCH_ANIMALS_ERROR',
  HANDLE_ERROR = 'HANDLE_ERROR'
}

export class AddAnimal implements Action {
  readonly type = ActionTypes.ADD_ANIMAL;
  animal: Livestock;
}

export class AddAnimalSucceeded implements Action {
  readonly type = ActionTypes.ADD_ANIMAL_SUCCESS;
  animal: Livestock;

  constructor(createdAnimal: Livestock) {
    this.animal = createdAnimal;
  }
}

export class UpdateAnimal implements Action {
  readonly type = ActionTypes.UPDATE_ANIMAL;
  animal: Livestock;

  constructor(animal: Livestock) {
    this.animal = animal;
  }
}

export class UpdateAnimalSucceeded implements Action {
  readonly type = ActionTypes.UPDATE_ANIMAL_SUCCESS;
  animal: Update<Livestock>;

  constructor(updatedAnimal: Update<Livestock>) {
    this.animal = updatedAnimal;
  }
}

export class RemoveAnimal implements Action {
  readonly type = ActionTypes.REMOVE_ANIMAL;
  key: number;

  constructor(id: number) {
    this.key = id;
  }
}

export class RemoveAnimalSucceeded implements Action {
  readonly type = ActionTypes.REMOVE_ANIMAL_SUCCESS;
  key: number;

  constructor(id: number) {
    this.key = id;
  }
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
}

export class SetAnimals implements Action {
  readonly type = ActionTypes.SET_ANIMALS;
  animals: Livestock[];
  selectedAnimalId: number;

  constructor(animals: Livestock[]) {
    this.animals = animals;
    this.selectedAnimalId = this.animals.length > 0 ? this.animals[0].id : null;
  }
}

export class HandleFetchAnimalsError implements Action {
  readonly type = ActionTypes.HANDLE_FETCH_ANIMALS_ERROR;
  error: Error;

  constructor(error: Error) {
    this.error = error;
  }
}

export class HandleError implements Action {
  readonly type = ActionTypes.HANDLE_ERROR;
  error: Error;

  constructor(error: Error) {
    this.error = error;
  }
}
