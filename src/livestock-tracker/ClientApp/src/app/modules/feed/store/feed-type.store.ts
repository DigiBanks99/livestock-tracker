import { FeedType } from '@core/models/feed-type.model';
import { FeedTypeState } from '@core/store';
import { feedTypeAdapter } from '@feed/store/feed-type.reducer';
import { Dictionary } from '@ngrx/entity';
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

const feedTypeState = createFeatureSelector<FeedTypeState>('feedTypes');

const {
  selectEntities: feedTypeEntities,
  selectIds: feedTypeIds,
  selectTotal: feedTypeCount
} = feedTypeAdapter.getSelectors(feedTypeState);

export const feedTypes = createSelector(
  feedTypeEntities,
  feedTypeIds,
  (entities: Dictionary<FeedType>, ids: (string | number)[]) =>
    (ids ?? [])
      .map((id) => (entities ?? {})[id])
      .filter((feedType: FeedType | null | undefined) => feedType != null) ?? []
);

export const selectedFeedTypeId = createSelector(
  feedTypeState,
  (state) => state.selectedId
);

export const selectedFeedType = createSelector(
  feedTypeEntities,
  selectedFeedTypeId,
  (entities, id) => entities[id]
);

export const isPending = createSelector(
  feedTypeState,
  (state) => state.isPending
);

export const pageSize = createSelector(
  feedTypeState,
  (state) => state.pageSize
);

export const currentPage = createSelector(
  feedTypeState,
  (state) => state.pageNumber
);

export const recordCount = createSelector(
  feedTypeState,
  (state) => state.recordCount
);

export const error = createSelector(feedTypeState, (state) => state.error);
