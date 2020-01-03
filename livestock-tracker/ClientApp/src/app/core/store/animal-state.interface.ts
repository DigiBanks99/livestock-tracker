import { Livestock } from '@core/models';

import { CrudState } from './crud-state.interface';

export interface AnimalState extends CrudState<Livestock, number> {}
