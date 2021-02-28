import * as animalActions from './animal.actions';
import * as animalEffects from './animal.effects';
import * as animalReducers from './animal.reducers';
import * as animalStore from './animal.store';

export const AnimalStore = {
  actions: { ...animalActions, ...animalActions.actions },
  effects: animalEffects,
  reducers: animalReducers,
  selectors: animalStore
};
