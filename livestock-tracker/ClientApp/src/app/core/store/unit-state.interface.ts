import { Unit } from '@core/models';

import { CrudState } from './crud-state.interface';

export interface UnitState extends CrudState<Unit, number> {}
