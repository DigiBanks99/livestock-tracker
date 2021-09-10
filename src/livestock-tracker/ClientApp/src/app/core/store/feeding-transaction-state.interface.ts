import { FeedingTransaction } from '@core/models';

import { CrudState } from './crud/crud-state.interface';

export interface FeedingTransactionState
  extends CrudState<FeedingTransaction, number> {}
