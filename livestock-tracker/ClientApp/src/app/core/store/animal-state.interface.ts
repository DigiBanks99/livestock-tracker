import { Animal, Livestock } from '@core/models';

import { CrudState } from './crud-state.interface';

export interface AnimalState extends CrudState<Animal, number> {
  pageNumber: number;
  pageSize: number;
  recordCount: number;
}
