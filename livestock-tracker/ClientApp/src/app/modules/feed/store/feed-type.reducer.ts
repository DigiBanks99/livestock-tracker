import { FeedType } from '@core/models/feed-type.model';
import { crudReducer } from '@core/store/crud.reducer';
import { FeedTypeState } from '@core/store/feed-type-state.interface';
import { ActionTypes, SelectFeedType } from '@feed/store/feed-type.actions';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { FeedTypeKey } from './constants';

export const feedTypeAdapter = createEntityAdapter<FeedType>({
  selectId: (feedType: FeedType) => feedType.id,
  sortComparer: (feedType: FeedType) => feedType.description
});

const entityState = feedTypeAdapter.getInitialState();
const initialState: FeedTypeState = {
  ...entityState,
  isFetching: false,
  isPending: false,
  error: null,
  selectedId: null
};

export function feedTypeReducer(
  state: FeedTypeState = initialState,
  action: Action
) {
  const newState = crudReducer(FeedTypeKey, feedTypeAdapter, state, action);
  if (newState !== state) return newState;

  switch (action.type) {
    case ActionTypes.SELECT_FEED_TYPE:
      return {
        selectedId: (<SelectFeedType>action).id,
        ...state
      };
    default:
      return state;
  }
}
