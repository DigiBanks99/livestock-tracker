import { Animal } from '@core/models';

import { CrudState } from './crud-state.interface';

export interface AnimalState extends CrudState<Animal, number> {}
