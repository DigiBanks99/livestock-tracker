import { AnimalState } from '@core/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { animalsAdapter } from './animal.reducers';

const getAnimalsState = createFeatureSelector<AnimalState>('animals');

const { selectEntities: getAnimalsEntities } = animalsAdapter.getSelectors(
  getAnimalsState
);

const fetchAnimalsPendingState = createSelector(
  getAnimalsState,
  (state) => state.isFetching
);

const animalsPendingState = createSelector(
  getAnimalsState,
  (state) => state.isPending
);

const getPageSize = createSelector(getAnimalsState, (state) => state.pageSize);

const getCurrentPage = createSelector(
  getAnimalsState,
  (state) => state.pageNumber
);

const getRecordCount = createSelector(
  getAnimalsState,
  (state) => state.recordCount
);

const getAnimalsError = createSelector(getAnimalsState, (state) => state.error);

export const selectors = {
  getAnimalsState,
  getAnimalsEntities,
  fetchAnimalsPendingState,
  animalsPendingState,
  getAnimalsError,
  getCurrentPage,
  getPageSize,
  getRecordCount
};
