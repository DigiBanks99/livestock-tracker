import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UnitState, unitAdapter } from './unit.reducers';

const unitState = createFeatureSelector<UnitState>('units');

const {
  selectAll: getUnits,
  selectEntities: getUnitEntities,
  selectIds: getUnitIds,
  selectTotal: getUnitCount
} = unitAdapter.getSelectors(unitState);

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
