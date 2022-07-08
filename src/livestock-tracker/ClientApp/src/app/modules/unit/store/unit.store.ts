import { Unit } from '@core/models/unit.model';
import { UnitState } from '@core/store';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { unitAdapter } from '@unit/store/unit.reducers';

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
    ids.map((id) => entities[id]).filter((unit): unit is Unit => unit !== null)
);
const getSelectedUnitId = createSelector(
  unitState,
  (state) => state.selectedId
);
const getSelectedUnit = createSelector(
  getUnitEntities,
  getSelectedUnitId,
  (entities, id) => entities[id]
);
const getUnitPending = createSelector(unitState, (state) => state.isPending);
const getUnitError = createSelector(unitState, (state) => state.error);

const getPageSize = createSelector(unitState, (state) => state.pageSize);

const getCurrentPage = createSelector(unitState, (state) => state.pageNumber);

const getRecordCount = createSelector(unitState, (state) => state.recordCount);

export const unitSelectors = {
  getUnits,
  getUnitEntities,
  getUnitIds,
  getUnitCount,
  getSelectedUnitId,
  getSelectedUnit,
  getUnitPending,
  getUnitError,
  getPageSize,
  getCurrentPage,
  getRecordCount
};
