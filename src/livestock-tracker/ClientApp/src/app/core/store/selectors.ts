import { Animal, Unit } from '@core/models';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AnimalState } from './animal';
import { UnitState } from './unit-state.interface';

function selectItems<TData>(
  entities: Dictionary<TData>,
  ids: (string | number)[]
): TData[] {
  return ids
    .map((id) => entities[id])
    .filter((entity): entity is TData => entity !== null);
}

export const animalState = createFeatureSelector<AnimalState>('animals');
const unitState = createFeatureSelector<UnitState>('units');

const getAnimalEntities = createSelector(
  animalState,
  (state: AnimalState): Dictionary<Animal> => state.entities
);

const getAnimalIds = createSelector(
  animalState,
  (state: AnimalState): (string | number)[] => state.ids
);

export const getSelectedAnimalId = createSelector(
  animalState,
  (state: AnimalState): number => state.selectedId
);

export const getAnimals = createSelector(
  getAnimalEntities,
  getAnimalIds,
  (entities: Dictionary<Animal>, ids: (string | number)[]): Animal[] =>
    selectItems<Animal>(entities, ids)
);

export const getAnimalCount = createSelector(
  getAnimalIds,
  (ids: (string | number)[]): number => ids.length
);

export const getSelectedAnimal = createSelector(
  animalState,
  getSelectedAnimalId,
  (state: AnimalState, id: number): Animal => state.entities[id]
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
