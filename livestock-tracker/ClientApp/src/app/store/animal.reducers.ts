import { Livestock } from '../livestock/livestock.model';
import { Action } from '@ngrx/store';
import {
  ActionTypes,
  AddAnimal,
  RemoveAnimal,
  SelectAnimal
} from './animal.actions';

interface AnimalKeyValue {
  [key: string]: Livestock;
}

export interface State {
  animals: AnimalKeyValue;
  selectedAnimal: string;
}

export const initialState: State = {
  animals: {},
  selectedAnimal: null
};

export function animals(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.ADD_ANIMAL:
      return { ...state, animals: addAnimal(state.animals, <AddAnimal>action) };
    case ActionTypes.REMOVE_ANIMAL:
      return {
        ...state,
        animals: removeAnimal(state.animals, <RemoveAnimal>action)
      };
    case ActionTypes.SELECT_ANIMAL:
      return {
        ...state,
        selectedAnimal: selectAnimal(state.selectedAnimal, <SelectAnimal>action)
      };
    default:
      return state;
  }
}

function addAnimal(animals: AnimalKeyValue, action: AddAnimal): AnimalKeyValue {
  return { ...animals, [action.animal.id.toString()]: action.animal };
}

function removeAnimal(
  animals: AnimalKeyValue,
  action: RemoveAnimal
): AnimalKeyValue {
  const newState = Object.assign({}, animals, {});

  delete newState[action.key];

  return newState;
}

function selectAnimal(key: string, action: SelectAnimal): string {
  if (action.key === undefined) return key;
  return '' + action.key;
}
