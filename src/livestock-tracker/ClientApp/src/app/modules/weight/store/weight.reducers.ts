import { SaveState } from '@core/models';
import { animalTransactionReducer } from '@core/store';
import { Action } from '@ngrx/store';
import { WeightState } from '@weight/interfaces';

import { weightTransactionAdapter } from './weight.adapter';
import { Constants } from './weight.constants';

export const initialState: WeightState = {
  ...weightTransactionAdapter.getInitialState(),
  error: null,
  isFetching: false,
  isPending: false,
  pageNumber: 0,
  pageSize: 10,
  recordCount: 0,
  saveState: SaveState.New,
  selectedId: 0
};

export function weightReducer(
  state: WeightState = initialState,
  action: Action
): WeightState {
  return animalTransactionReducer(
    Constants.StoreKey,
    weightTransactionAdapter,
    state,
    action
  );
}
