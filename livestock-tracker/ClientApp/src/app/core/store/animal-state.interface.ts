import { Livestock } from '@core/models';
import { EntityState } from '@ngrx/entity';

export interface AnimalState extends EntityState<Livestock> {
  selectedAnimal: number;
  error?: Error;
  isFetching: boolean;
  isPending: boolean;
}
