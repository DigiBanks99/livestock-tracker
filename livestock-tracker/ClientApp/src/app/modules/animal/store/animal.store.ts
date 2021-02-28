import { AnimalState } from '@core/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { animalsAdapter } from './animal.reducers';

export const getAnimalsState = createFeatureSelector<AnimalState>('animals');

export const {
  selectEntities: getAnimalsEntities
} = animalsAdapter.getSelectors(getAnimalsState);

export const fetchAnimalsPendingState = createSelector(
  getAnimalsState,
  (state) => state.isFetching
);

export const animalsPendingState = createSelector(
  getAnimalsState,
  (state) => state.isPending
);

export const getPageSize = createSelector(
  getAnimalsState,
  (state) => state.pageSize
);

export const getCurrentPage = createSelector(
  getAnimalsState,
  (state) => state.pageNumber
);

export const getRecordCount = createSelector(
  getAnimalsState,
  (state) => state.recordCount
);

export const getAnimalsError = createSelector(
  getAnimalsState,
  (state) => state.error
);

export const getSaveState = createSelector(
  getAnimalsState,
  (state: AnimalState) => state.saveState
);
