import {
  animalsReducer,
  animalsAdapter,
  State as AnimalState
} from '@animal-store/reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const reducers = {
  animals: animalsReducer
};

const getAnimalsState = createFeatureSelector<AnimalState>('animals');

export const {
  selectAll: getAnimals,
  selectEntities: getAnimalsEntities
} = animalsAdapter.getSelectors(getAnimalsState);

export const getSelectedAnimal = createSelector(
  getAnimalsState,
  state => state.selectedAnimal
);

export const getFetchAnimalsPendingState = createSelector(
  getAnimalsState,
  state => state.isFetching
);

export const getFetchAnimalsError = createSelector(
  getAnimalsState,
  state => state.error
);
