import { Animal, SaveState } from '@core/models';
import { AnimalState, crudReducer } from '@core/store';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { AnimalActionTypes, SelectAnimalAction } from './animal.actions';
import { AnimalKey } from './constants';

export const animalsAdapter = createEntityAdapter<Animal>({
  selectId: (animal: Animal) => animal.id,
  sortComparer: (animal: Animal) => animal.number
});

export const initialState: AnimalState = animalsAdapter.getInitialState({
  selectedId: null,
  error: null,
  isFetching: false,
  isPending: false,
  pageNumber: 0,
  pageSize: 10,
  recordCount: 0,
  saveState: SaveState.New
});

export function animalsReducer(
  state: AnimalState = initialState,
  action: Action
): AnimalState {
  switch (action.type) {
    case AnimalActionTypes.SelectAnimal:
      return {
        ...state,
        selectedId: selectAnimal(state.selectedId, <SelectAnimalAction>action)
      };
    default:
      return {
        ...state,
        ...crudReducer(AnimalKey, animalsAdapter, state, action)
      };
  }
}

function selectAnimal(key: number, action: SelectAnimalAction): number {
  if (action.key === undefined) return key;
  return action.key || 0;
}
