import { SaveState } from '@core/models';
import { FeedType } from '@core/models/feed-type.model';
import { crudReducer } from '@core/store/crud.reducer';
import { FeedTypeState } from '@core/store/feed-type-state.interface';
import { environment } from '@env/environment';
import { ActionTypes, SelectFeedType } from '@feed/store/feed-type.actions';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { FeedTypeKey } from './constants';

export const feedTypeAdapter = createEntityAdapter<FeedType>({
  selectId: (feedType: FeedType) => feedType.id,
  sortComparer: (feedType: FeedType) => feedType.description
});

const initialState: FeedTypeState = {
  ...feedTypeAdapter.getInitialState(),
  isFetching: false,
  isPending: false,
  error: null,
  selectedId: null,
  pageNumber: 0,
  pageSize: environment.pageSize,
  recordCount: 0,
  saveState: SaveState.New
};

export function feedTypeReducer(
  state: FeedTypeState = initialState,
  action: Action
) {
  switch (action.type) {
    case ActionTypes.SELECT_FEED_TYPE:
      return {
        selectedId: (<SelectFeedType>action).id,
        ...state
      };
    default:
      return {
        ...state,
        ...crudReducer(FeedTypeKey, feedTypeAdapter, state, action)
      };
  }
}
