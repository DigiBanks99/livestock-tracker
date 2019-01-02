import { animalsReducer, AnimalState } from '@animal-store/reducers';
import { selectors as animalSelectors } from '@animal-store/store';
import {
  feedingTransactionReducer,
  FeedingTransactionState
} from '@feeding-transaction-store/reducer';
import { selectors as feedingTransactionSelectors } from '@feeding-transaction-store/store';

export const reducers = {
  animals: animalsReducer,
  feedingTransactions: feedingTransactionReducer
};

export interface State {
  animals: AnimalState;
  feedingTransactions: FeedingTransactionState;
}

export const selectors = {
  animalSelectors,
  feedingTransactionSelectors
};
