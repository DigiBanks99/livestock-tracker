import { KraalStats } from '@animal/models';
import {
  Animal,
  SaveState
} from '@core/models';
import {
  AnimalState,
  crudReducer
} from '@core/store';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { AnimalActionTypes } from './animal.action-types';
import {
  actions,
  SelectAnimalAction
} from './animal.actions';
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
  kraalStats: new KraalStats(),
  pageNumber: 0,
  pageSize: 10,
  recordCount: 0,
  saveState: SaveState.New
});

export function animalsReducer(
  state: AnimalState = initialState,
  action: Action | (Action & KraalStats)
): AnimalState {
  switch (action.type) {
    case AnimalActionTypes.SelectAnimal:
      return {
        ...state,
        selectedId: selectAnimal(state.selectedId, <SelectAnimalAction>action)
      };
    case actions.FetchKraalStats.type:
      return {
        ...state,
        kraalStats: { ...initialState.kraalStats }
      };
    case actions.FetchKraalStatsSuccess.type:
      return {
        ...state,
        kraalStats: { ...(<KraalStats>action) }
      };
    default:
      return {
        ...state,
        ...crudReducer(AnimalKey, animalsAdapter, state, action)
      };
  }
}

function selectAnimal(
  key: number | null,
  action: SelectAnimalAction
): number | null {
  if (action.key === undefined) return key;
  return action.key || 0;
}
