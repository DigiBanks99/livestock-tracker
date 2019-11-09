import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UnitState, unitAdapter } from './unit.reducers';
import { Dictionary } from '@ngrx/entity';
import { Unit } from '@core/models/unit.model';

const unitState = createFeatureSelector<UnitState>('units');

const {
  selectEntities: getUnitEntities,
  selectIds: getUnitIds,
  selectTotal: getUnitCount
} = unitAdapter.getSelectors(unitState);

const getUnits = createSelector(
  getUnitEntities,
  getUnitIds,
  (entities: Dictionary<Unit>, ids: (number | string)[]) =>
    ids.map(id => entities[id]).filter((unit): unit is Unit => unit !== null)
);
const getSelectedUnitId = createSelector(
  unitState,
  state => state.selectedUnitId
);
const getSelectedUnit = createSelector(
  getUnitEntities,
  getSelectedUnitId,
  (entities, id) => entities[id]
);
const getUnitPending = createSelector(
  unitState,
  state => state.isPending
);
const getUnitError = createSelector(
  unitState,
  state => state.error
);

export const unitSelectors = {
  getUnits,
  getUnitEntities,
  getUnitIds,
  getUnitCount,
  getSelectedUnitId,
  getSelectedUnit,
  getUnitPending,
  getUnitError
};
