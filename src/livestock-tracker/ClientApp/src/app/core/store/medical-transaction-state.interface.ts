import { MedicalTransaction } from '@core/models';

import { CrudState } from './crud/crud-state.interface';

export interface MedicalTransactionState
  extends CrudState<MedicalTransaction, number> {}
