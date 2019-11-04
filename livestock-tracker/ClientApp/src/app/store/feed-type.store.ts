import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedTypeState, feedTypeAdapter } from './feed-type.reducer';
import { FeedType } from '@feed-type/feed-type.model';
import { Dictionary } from '@ngrx/entity';

const getFeedTypeState = createFeatureSelector<FeedTypeState>('feedTypes');

const {
  selectEntities: getFeedTypeEntities,
  selectIds: getFeedTypeIds,
  selectTotal: getFeedTypeCount
} = feedTypeAdapter.getSelectors(getFeedTypeState);

const getFeedTypes = createSelector(
  getFeedTypeEntities,
  getFeedTypeIds,
  (entities: Dictionary<FeedType>, ids: (string | number)[]) =>
    ids
      .map(id => entities[id])
      .filter((feedType): feedType is FeedType => feedType !== null)
);

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
