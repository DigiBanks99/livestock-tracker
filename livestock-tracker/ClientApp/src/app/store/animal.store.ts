import { AnimalState, animalsAdapter } from './animal.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getAnimalsState = createFeatureSelector<AnimalState>('animals');

const {
  selectAll: getAnimals,
  selectEntities: getAnimalsEntities,
  selectTotal: getAnimalCount
} = animalsAdapter.getSelectors(getAnimalsState);

const getSelectedAnimalId = createSelector(
  getAnimalsState,
  state => state.selectedAnimal
);

const getSelectedAnimal = createSelector(
  getAnimalsEntities,
  getSelectedAnimalId,
  (entities, id) => entities[id]
);

const getFetchAnimalsPendingState = createSelector(
  getAnimalsState,
  state => state.isFetching
);

const getAnimalsPendingState = createSelector(
  getAnimalsState,
  state => state.isPending
);

const getAnimalsError = createSelector(
  getAnimalsState,
  state => state.error
);

export const selectors = {
  getAnimals: getAnimals,
  getAnimalsEntities: getAnimalsEntities,
  getAnimalCount: getAnimalCount,
  getSelectedAnimalId: getSelectedAnimalId,
  getSelectedAnimal: getSelectedAnimal,
  getFetchAnimalsPendingState: getFetchAnimalsPendingState,
  getAnimalsPendingState: getAnimalsPendingState,
  getAnimalsError: getAnimalsError
};
