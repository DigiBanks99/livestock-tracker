import { Livestock, Unit } from '@core/models';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AnimalState } from './animal-state.interface';
import { UnitState } from './unit-state.interface';

function selectItems<T>(
  entities: Dictionary<T>,
  ids: (string | number)[]
): T[] {
  return ids.map(id => entities[id]).filter((unit): unit is T => unit !== null);
}

const animalState = createFeatureSelector<AnimalState>('animals');
const unitState = createFeatureSelector<UnitState>('units');

const getAnimalEntities = createSelector(
  animalState,
  (state: AnimalState): Dictionary<Livestock> => state.entities
);
const getAnimalIds = createSelector(
  animalState,
  (state: AnimalState): (string | number)[] => state.ids
);
export const getSelectedAnimalId = createSelector(
  animalState,
  (state: AnimalState): number => state.selectedAnimal
);
export const getAnimals = createSelector(
  getAnimalEntities,
  getAnimalIds,
  (entities: Dictionary<Livestock>, ids: (string | number)[]): Livestock[] =>
    selectItems<Livestock>(entities, ids)
);
export const getAnimalCount = createSelector(
  getAnimalIds,
  (ids: (string | number)[]): number => ids.length
);
export const getSelectedAnimal = createSelector(
  animalState,
  getSelectedAnimalId,
  (state: AnimalState, id: number): Livestock => state.entities[id]
);

const getUnitEntities = createSelector(
  unitState,
  (state: UnitState): Dictionary<Unit> => state.entities
);
const getUnitIds = createSelector(
  unitState,
  (state: UnitState): (string | number)[] => state.ids
);
export const getUnits = createSelector(
  getUnitEntities,
  getUnitIds,
  (entities: Dictionary<Unit>, ids: (string | number)[]): Unit[] =>
    selectItems<Unit>(entities, ids)
);
