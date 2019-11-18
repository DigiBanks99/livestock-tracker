import { FeedingTransaction } from '@core/models';
import { EntityState } from '@ngrx/entity';

export interface FeedingTransactionState
  extends EntityState<FeedingTransaction> {
  selectedTransactionId: number;
  isPending: boolean;
  error?: Error;
}
