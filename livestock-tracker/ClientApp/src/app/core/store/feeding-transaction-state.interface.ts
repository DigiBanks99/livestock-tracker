import { FeedingTransaction } from '@core/models';

import { CrudState } from './crud-state.interface';

export interface FeedingTransactionState
  extends CrudState<FeedingTransaction, number> {
  pageNumber: number;
  pageSize: number;
  recordCount: number;
}
