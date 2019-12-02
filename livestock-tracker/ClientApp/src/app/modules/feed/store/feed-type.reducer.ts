import { KeyValue } from '@angular/common';
import { FeedType } from '@core/models/feed-type.model';
import { PayloadAction } from '@core/store';
import { FeedTypeState } from '@core/store/feed-type-state.interface';
import { ActionTypes, SelectFeedType } from '@feed/store/feed-type.actions';
import { createEntityAdapter, Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export const feedTypeAdapter = createEntityAdapter<FeedType>({
  selectId: (feedType: FeedType) => feedType.id,
  sortComparer: (feedType: FeedType) => feedType.description
});

export const initialState = feedTypeAdapter.getInitialState({
  selectedFeedTypeId: null,
  isPending: false,
  error: null
});

export function feedTypeReducer(
  state: FeedTypeState = initialState,
  action: Action
) {
  switch (action.type) {
    case ActionTypes.ADD_FEED_TYPE:
    case ActionTypes.UPDATE_FEED_TYPE:
    case ActionTypes.REMOVE_FEED_TYPE:
    case ActionTypes.FETCH_FEED_TYPES:
      return {
        isPending: true,
        error: null,
        ...state
      };
    case ActionTypes.ADD_FEED_TYPE_SUCCESS:
    case 'API_ADD_FEED_TYPE':
      return {
        ...addOne(state, <PayloadAction<FeedType>>action)
      };
    case ActionTypes.UPDATE_FEED_TYPE_SUCCESS:
    case 'API_UPDATE_FEED_TYPE':
      return {
        ...updateOne(
          state,
          <PayloadAction<KeyValue<number, Update<FeedType>>>>action
        )
      };
    case ActionTypes.REMOVE_FEED_TYPE_SUCCESS:
    case 'API_DELETE_FEED_TYPE':
      return {
        ...removeOne(state, <PayloadAction<number>>action)
      };
    case ActionTypes.SET_FEED_TYPES:
    case 'API_FETCH_FEED_TYPE':
      return {
        ...setAll(state, <PayloadAction<FeedType[]>>action)
      };
    case ActionTypes.SELECT_FEED_TYPE:
      return {
        selectedFeedTypeId: (<SelectFeedType>action).id,
        ...state
      };
    case ActionTypes.FEED_TYPE_ERROR:
    case 'API_ERROR_FEED_TYPE':
      return {
        error: (<PayloadAction<Error>>action).payload,
        isPending: false,
        ...state
      };
    default:
      return state;
  }
}

function addOne(
  state: FeedTypeState,
  action: PayloadAction<FeedType>
): FeedTypeState {
  const newState = feedTypeAdapter.addOne(action.payload, state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}

function updateOne(
  state: FeedTypeState,
  action: PayloadAction<KeyValue<number, Update<FeedType>>>
): FeedTypeState {
  const newState = feedTypeAdapter.updateOne(action.payload.value, state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}

function removeOne(
  state: FeedTypeState,
  action: PayloadAction<number>
): FeedTypeState {
  const newState = feedTypeAdapter.removeOne(action.payload, state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}

function setAll(
  state: FeedTypeState,
  action: PayloadAction<FeedType[]>
): FeedTypeState {
  const newState = feedTypeAdapter.addAll(action.payload, state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}
