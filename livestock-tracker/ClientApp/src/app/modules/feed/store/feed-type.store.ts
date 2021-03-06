import { FeedType } from '@core/models/feed-type.model';
import { FeedTypeState } from '@core/store';
import { feedTypeAdapter } from '@feed/store/feed-type.reducer';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getFeedTypeState = createFeatureSelector<FeedTypeState>('feedTypes');

const {
  selectEntities: getFeedTypeEntities,
  selectIds: getFeedTypeIds,
  selectTotal: getFeedTypeCount,
} = feedTypeAdapter.getSelectors(getFeedTypeState);

const getFeedTypes = createSelector(
  getFeedTypeEntities,
  getFeedTypeIds,
  (entities: Dictionary<FeedType>, ids: (string | number)[]) =>
    ids
      .map((id) => entities[id])
      .filter((feedType): feedType is FeedType => feedType !== null)
);

const getSelectedFeedTypeId = createSelector(
  getFeedTypeState,
  (state) => state.selectedId
);

const getSelectedFeedType = createSelector(
  getFeedTypeEntities,
  getSelectedFeedTypeId,
  (entities, id) => entities[id]
);

const getFeedTypePending = createSelector(
  getFeedTypeState,
  (state) => state.isPending
);

const getPageSize = createSelector(getFeedTypeState, (state) => state.pageSize);

const getCurrentPage = createSelector(
  getFeedTypeState,
  (state) => state.pageNumber
);

const getRecordCount = createSelector(
  getFeedTypeState,
  (state) => state.recordCount
);

const getFeedTypeError = createSelector(
  getFeedTypeState,
  (state) => state.error
);

export const selectors = {
  getFeedTypeState,
  getFeedTypes,
  getFeedTypeEntities,
  getFeedTypeIds,
  getFeedTypeCount,
  getSelectedFeedTypeId,
  getSelectedFeedType,
  getFeedTypePending,
  getFeedTypeError,
  getCurrentPage,
  getPageSize,
  getRecordCount,
};
