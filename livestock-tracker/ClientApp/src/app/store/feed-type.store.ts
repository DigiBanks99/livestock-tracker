import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedTypeState, feedTypeAdapter } from './feed-type.reducer';

const getFeedTypeState = createFeatureSelector<FeedTypeState>('feedTypes');

const {
  selectAll: getFeedTypes,
  selectEntities: getFeedTypeEntities,
  selectIds: getFeedTypeIds,
  selectTotal: getFeedTypeCount
} = feedTypeAdapter.getSelectors(getFeedTypeState);

const getSelectedFeedTypeId = createSelector(
  getFeedTypeState,
  state => state.selectedFeedTypeId
);

const getSelectedFeedType = createSelector(
  getFeedTypeEntities,
  getSelectedFeedTypeId,
  (entities, id) => entities[id]
);

const getFeedTypePending = createSelector(
  getFeedTypeState,
  state => state.isPending
);

const getFeedTypeError = createSelector(
  getFeedTypeState,
  state => state.error
);

export const selectors = {
  getFeedTypes,
  getFeedTypeEntities,
  getFeedTypeIds,
  getFeedTypeCount,
  getSelectedFeedTypeId,
  getSelectedFeedType,
  getFeedTypePending,
  getFeedTypeError
};
