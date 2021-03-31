import { AnimalTransaction } from '@core/models';

export interface WeightTransaction extends AnimalTransaction {
  weight: number;
}
