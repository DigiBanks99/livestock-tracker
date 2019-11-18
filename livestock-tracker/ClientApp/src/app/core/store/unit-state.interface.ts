import { Unit } from '@core/models';
import { EntityState } from '@ngrx/entity';

export interface UnitState extends EntityState<Unit> {
  selectedUnitId: number;
  isPending: boolean;
  error?: Error;
}
