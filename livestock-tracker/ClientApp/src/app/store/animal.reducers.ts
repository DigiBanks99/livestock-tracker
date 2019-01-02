import { Livestock } from '@livestock/livestock.model';
import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter, Update } from '@ngrx/entity';
import {
  ActionTypes,
  RemoveAnimal,
  SelectAnimal,
  SetAnimals,
  HandleFetchAnimalsError,
  UpdateAnimalSucceeded,
  AddAnimalSucceeded,
  HandleError
} from '@animal-store/actions';

export const animalsAdapter = createEntityAdapter<Livestock>({
  selectId: (animal: Livestock) => animal.id,
  sortComparer: false
});

export interface AnimalState extends EntityState<Livestock> {
  selectedAnimal: number;
  error?: Error;
  isFetching: boolean;
  isPending: boolean;
}

export const initialState: AnimalState = animalsAdapter.getInitialState({
  selectedAnimal: null,
  error: null,
  isFetching: false,
  isPending: false
});

export function animalsReducer(
  state: AnimalState = initialState,
  action: Action
): AnimalState {
  switch (action.type) {
    case ActionTypes.ADD_ANIMAL:
    case ActionTypes.UPDATE_ANIMAL:
    case ActionTypes.REMOVE_ANIMAL:
      return {
        ...state,
        isPending: true
      };
    case ActionTypes.ADD_ANIMAL_SUCCESS:
      const addedAnimal: Livestock = (<AddAnimalSucceeded>action).animal;
      return {
        ...animalsAdapter.addOne(addedAnimal, {
          ...state,
          selectedAnimal: addedAnimal.id,
          isPending: false,
          error: null
        })
      };
    case ActionTypes.REMOVE_ANIMAL_SUCCESS:
      return {
        ...animalsAdapter.removeOne((<RemoveAnimal>action).key, {
          ...state,
          isPending: false,
          error: null
        })
      };
    case ActionTypes.UPDATE_ANIMAL_SUCCESS:
      const updatedAnimal: Update<Livestock> = (<UpdateAnimalSucceeded>action)
        .animal;
      return {
        ...animalsAdapter.updateOne(updatedAnimal, {
          ...state,
          selectedAnimal: +updatedAnimal.id,
          isPending: false,
          error: null
        })
      };
    case ActionTypes.SELECT_ANIMAL:
      return {
        ...state,
        selectedAnimal: selectAnimal(state.selectedAnimal, <SelectAnimal>action)
      };
    case ActionTypes.FETCH_ANIMALS:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.SET_ANIMALS:
      const newState = animalsAdapter.addMany((<SetAnimals>action).animals, {
        ...state
      });
      let selectedAnimalId: number = newState.selectedAnimal;
      if (!selectedAnimalId)
        selectedAnimalId = newState.ids.length > 0 ? +newState.ids[0] : null;
      return {
        ...newState,
        selectedAnimal: selectedAnimalId,
        isFetching: false,
        error: null
      };
    case ActionTypes.HANDLE_FETCH_ANIMALS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: handleError(state.error, <HandleFetchAnimalsError>action)
      };
    case ActionTypes.HANDLE_ERROR:
      return {
        ...state,
        isPending: false,
        error: handleError(state.error, <HandleError>action)
      };
    default:
      return state;
  }
}

function selectAnimal(key: number, action: SelectAnimal): number {
  if (action.key === undefined) return key;
  return 0 + action.key;
}

function handleError(
  error: Error,
  action: HandleFetchAnimalsError | HandleError
): Error {
  const newError = new Error(action.error.message);
  newError.name = action.error.name;
  newError.stack = action.error.stack;
  return newError;
}
