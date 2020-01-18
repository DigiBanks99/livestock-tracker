import { AnimalState } from '@core/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { animalsAdapter } from './animal.reducers';

const getAnimalsState = createFeatureSelector<AnimalState>('animals');

const { selectEntities: getAnimalsEntities } = animalsAdapter.getSelectors(
  getAnimalsState
);

const getFetchAnimalsPendingState = createSelector(
  getAnimalsState,
  state => state.isFetching
);

const getAnimalsPendingState = createSelector(
  getAnimalsState,
  state => state.isPending
);

const getAnimalsError = createSelector(getAnimalsState, state => state.error);

export const selectors = {
  getAnimalsEntities: getAnimalsEntities,
  getFetchAnimalsPendingState: getFetchAnimalsPendingState,
  getAnimalsPendingState: getAnimalsPendingState,
  getAnimalsError: getAnimalsError
};
