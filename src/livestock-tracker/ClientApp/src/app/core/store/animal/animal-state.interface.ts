import { Animal } from '@core/models';

import { CrudState } from '../crud';

export interface AnimalState extends CrudState<Animal, number> {}
