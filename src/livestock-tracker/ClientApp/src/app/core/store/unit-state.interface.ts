import { Unit } from '@core/models';

import { CrudState } from './crud/crud-state.interface';

export interface UnitState extends CrudState<Unit, number> {}
