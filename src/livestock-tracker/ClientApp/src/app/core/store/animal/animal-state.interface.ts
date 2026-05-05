import { KraalStats } from '@animal/models';
import { Animal } from '@core/models';

import { CrudState } from '../crud';

export interface AnimalState extends CrudState<Animal, number> {
  kraalStats: KraalStats;
}
