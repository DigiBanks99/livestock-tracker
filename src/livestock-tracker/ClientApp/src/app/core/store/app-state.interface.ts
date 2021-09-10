import { AnimalState } from './animal';
import { FeedTypeState } from './feed-type-state.interface';
import { FeedingTransactionState } from './feeding-transaction-state.interface';
import { UnitState } from './unit-state.interface';

export interface AppState {
  animals: AnimalState;
  feedTypes: FeedTypeState;
  feedingTransactions: FeedingTransactionState;
  units: UnitState;
}
