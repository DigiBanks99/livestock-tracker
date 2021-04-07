import { MedicineType } from '@core/models';

import { CrudState } from './crud/crud-state.interface';

export interface MedicineTypeState extends CrudState<MedicineType, number> {}
