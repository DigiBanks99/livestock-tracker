import { CrudState } from '@core/store';

import { WeightTransaction } from './weight-transaction.interface';

export interface WeightState extends CrudState<WeightTransaction, number> {}
