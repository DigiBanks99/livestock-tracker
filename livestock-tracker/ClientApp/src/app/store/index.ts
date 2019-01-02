import { animalsReducer, AnimalState } from '@animal-store/reducers';
import { selectors as animalSelectors } from '@animal-store/store';
import {
  feedingTransactionReducer,
  FeedingTransactionState
} from '@feeding-transaction-store/reducer';
import { selectors as feedingTransactionSelectors } from '@feeding-transaction-store/store';
import { feedTypeReducer, FeedTypeState } from '@feed-type-store/reducer';
import { selectors as feedTypeSelectors } from '@feed-type-store/store';

export const reducers = {
  animals: animalsReducer,
  feedingTransactions: feedingTransactionReducer,
  feedTypes: feedTypeReducer
};

export interface State {
  animals: AnimalState;
  feedingTransactions: FeedingTransactionState;
  feedTypes: FeedTypeState;
}

export const selectors = {
  animalSelectors,
  feedingTransactionSelectors,
  feedTypeSelectors
};
