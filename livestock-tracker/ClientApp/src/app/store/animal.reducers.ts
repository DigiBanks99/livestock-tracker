import { Livestock } from '@livestock/livestock.model';
import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  ActionTypes,
  AddAnimal,
  RemoveAnimal,
  SelectAnimal,
  SetAnimals,
  HandleFetchAnimalsError
} from '@animal-store/actions';

export const animalsAdapter = createEntityAdapter<Livestock>({
  selectId: (animal: Livestock) => animal.id,
  sortComparer: false
});

export interface State extends EntityState<Livestock> {
  selectedAnimal: number;
  error?: Error;
  isFetching: boolean;
}

export const initialState: State = animalsAdapter.getInitialState({
  selectedAnimal: null,
  error: null,
  isFetching: false
});

export function animalsReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case ActionTypes.ADD_ANIMAL:
      return animalsAdapter.addOne((<AddAnimal>action).animal, state);
    case ActionTypes.REMOVE_ANIMAL:
      return animalsAdapter.removeOne((<RemoveAnimal>action).key, state);
    case ActionTypes.SELECT_ANIMAL:
      return {
        ...state,
        selectedAnimal: selectAnimal(state.selectedAnimal, <SelectAnimal>action)
      };
    case ActionTypes.FETCH_ANIMALS:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case ActionTypes.SET_ANIMALS:
      const newState = animalsAdapter.addMany(
        (<SetAnimals>action).animals,
        state
      );
      return {
        ...newState,
        isFetching: false,
        error: null
      };
    case ActionTypes.HANDLE_FETCH_ANIMALS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: handleFetchAnimalsError(state.error, <HandleFetchAnimalsError>(
          action
        ))
      };
    default:
      return state;
  }
}

function selectAnimal(key: number, action: SelectAnimal): number {
  if (action.key === undefined) return key;
  return 0 + action.key;
}

function handleFetchAnimalsError(
  error: Error,
  action: HandleFetchAnimalsError
): Error {
  return { ...action.error };
}
