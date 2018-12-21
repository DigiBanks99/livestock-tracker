import {
  animalsReducer,
  animalsAdapter,
  State as AnimalState
} from '@animal-store/reducers';
import {
  feedingTransactionReducer,
  feedingTransactionAdapter,
  FeedingTransactionState
} from '@feeding-transaction-store/reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const reducers = {
  animals: animalsReducer,
  feedingTransactions: feedingTransactionReducer
};

export interface State {
  animals: AnimalState;
  feedingTransactions: FeedingTransactionState;
}

const getAnimalsState = createFeatureSelector<AnimalState>('animals');
const getFeedingTransactionState = createFeatureSelector<
  FeedingTransactionState
>('feedingTransactions');

export const {
  selectAll: getAnimals,
  selectEntities: getAnimalsEntities,
  selectTotal: getAnimalCount
} = animalsAdapter.getSelectors(getAnimalsState);

export const getSelectedAnimalId = createSelector(
  getAnimalsState,
  state => state.selectedAnimal
);

export const getSelectedAnimal = createSelector(
  getAnimalsEntities,
  getSelectedAnimalId,
  (entities, id) => entities[id]
);

export const getFetchAnimalsPendingState = createSelector(
  getAnimalsState,
  state => state.isFetching
);

export const getAnimalsPendingState = createSelector(
  getAnimalsState,
  state => state.isPending
);

export const getAnimalsError = createSelector(
  getAnimalsState,
  state => state.error
);

export const {
  selectAll: getAllFeedingTransactions,
  selectEntities: getAllFeedingTransactionEntities,
  selectTotal: getFeedingTransactionCount
} = feedingTransactionAdapter.getSelectors(getFeedingTransactionState);

export const getSelectedFeedingTransactionId = createSelector(
  getFeedingTransactionState,
  state => {
    return state.selectedTransactionId;
  }
);

export const getSelectedFeedingTransaction = createSelector(
  getAllFeedingTransactionEntities,
  getSelectedFeedingTransactionId,
  (entities, id) => {
    return entities[id];
  }
);

export const getFeedingTransactionPendingState = createSelector(
  getFeedingTransactionState,
  state => state.isPending
);

export const getFeedingTransactionErrorState = createSelector(
  getFeedingTransactionState,
  state => state.error
);
