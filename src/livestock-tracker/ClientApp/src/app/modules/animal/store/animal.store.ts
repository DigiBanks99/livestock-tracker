import { KraalStats } from '@animal/models';
import { AnimalState } from '@core/store';
import { animalState } from '@core/store/selectors';
import { createSelector } from '@ngrx/store';

import {
  animalsAdapter,
  initialState
} from './animal.reducers';

export const getAnimalsState = animalState;

export const { selectEntities: getAnimalsEntities } =
  animalsAdapter.getSelectors(getAnimalsState);

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

export const paginationParameters = createSelector(
  getAnimalsState,
  (state) => ({
    pageNumber: state.pageNumber ?? 0,
    pageSize: state.pageSize ?? 10
  })
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

export const kraalStats = createSelector(
  getAnimalsState,
  (state: AnimalState): KraalStats =>
    state.kraalStats ?? initialState.kraalStats
);
