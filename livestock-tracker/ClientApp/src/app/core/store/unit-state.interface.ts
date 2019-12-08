import { Unit } from '@core/models';
import { EntityState } from '@ngrx/entity';

import { CrudState } from './crud-state.interface';

export interface UnitState extends CrudState<Unit, number> {}
