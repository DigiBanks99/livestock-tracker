import { FeedType } from '@core/models/feed-type.model';
import { PagedData } from '@core/models/paged-data.model';
import { PayloadAction } from '@core/store';
import { crudReducer } from '@core/store/crud.reducer';
import { FeedTypeState } from '@core/store/feed-type-state.interface';
import { ActionTypes, SelectFeedType } from '@feed/store/feed-type.actions';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { FeedTypeKey } from './constants';

export const feedTypeAdapter = createEntityAdapter<FeedType>({
  selectId: (feedType: FeedType) => feedType.id,
  sortComparer: (feedType: FeedType) => feedType.description,
});

const entityState = feedTypeAdapter.getInitialState();
const initialState: FeedTypeState = {
  ...entityState,
  isFetching: false,
  isPending: false,
  error: null,
  selectedId: null,
  pageNumber: 0,
  pageSize: 10,
  recordCount: 0,
};

export function feedTypeReducer(
  state: FeedTypeState = initialState,
  action: Action
) {
  switch (action.type) {
    case ActionTypes.SELECT_FEED_TYPE:
      return {
        selectedId: (<SelectFeedType>action).id,
        ...state,
      };
    case ActionTypes.API_FETCH_FEED_TYPES:
      const apiAction = <PayloadAction<PagedData<FeedType>>>action;
      const payloadAction: PayloadAction<FeedType[]> = {
        type: ActionTypes.API_FETCH_FEED_TYPES,
        payload: apiAction.payload.data,
      };
      return {
        ...crudReducer(FeedTypeKey, feedTypeAdapter, state, payloadAction),
        pageNumber: apiAction.payload.currentPage,
        pageSize: apiAction.payload.pageSize,
        recordCount: apiAction.payload.totalRecordCount,
      };
    default:
      return {
        ...state,
        ...crudReducer(FeedTypeKey, feedTypeAdapter, state, action),
      };
  }
}
