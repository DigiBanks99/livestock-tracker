import {
  FetchAnimalTransactionActions,
  fetchAnimalTransactionsActionFactory
} from '@core/store';
import { WeightTransaction } from '@weight/interfaces';

import { Constants } from './weight.constants';

export interface WeightActions
  extends FetchAnimalTransactionActions<WeightTransaction> {}

export const actions: WeightActions = {
  ...fetchAnimalTransactionsActionFactory<WeightTransaction>(Constants.StoreKey)
};
