import { Animal } from '@app/core/models/livestock.model';
import { AnimalState } from '@core/store/animal-state.interface';
import { crudReducer } from '@core/store/crud.reducer';
import { ActionTypes, SelectAnimal } from '@animal/store/animal.actions';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { AnimalKey } from './constants';

export const animalsAdapter = createEntityAdapter<Animal>({
  selectId: (animal: Animal) => animal.id,
  sortComparer: (animal: Animal) => animal.number
});

export const initialState: AnimalState = animalsAdapter.getInitialState({
  selectedId: null,
  error: null,
  isFetching: false,
  isPending: false
});

export function animalsReducer(
  state: AnimalState = initialState,
  action: Action
): AnimalState {
  switch (action.type) {
    case ActionTypes.SELECT_ANIMAL:
      return {
        ...state,
        selectedId: selectAnimal(state.selectedId, <SelectAnimal>action)
      };
    default:
      return crudReducer(AnimalKey, animalsAdapter, state, action);
  }
}

function selectAnimal(key: number, action: SelectAnimal): number {
  if (action.key === undefined) return key;
  return action.key || 0;
}
