import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { FeedType } from '@feed-type/feed-type.model';
import {
  ActionTypes,
  AddFeedTypeSuccess,
  UpdateFeedTypeSuccess,
  RemoveFeedTypeSuccess,
  SetFeedTypes,
  FeedTypeError,
  SelectFeedType
} from '@feed-type-store/actions';

export interface FeedTypeState extends EntityState<FeedType> {
  selectedFeedTypeId: number;
  isPending: boolean;
  error?: Error;
}

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
      return {
        ...addOne(state, <AddFeedTypeSuccess>action)
      };
    case ActionTypes.UPDATE_FEED_TYPE_SUCCESS:
      return {
        ...updateOne(state, <UpdateFeedTypeSuccess>action)
      };
    case ActionTypes.REMOVE_FEED_TYPE_SUCCESS:
      return {
        ...removeOne(state, <RemoveFeedTypeSuccess>action)
      };
    case ActionTypes.SET_FEED_TYPES:
      return {
        ...setAll(state, <SetFeedTypes>action)
      };
    case ActionTypes.SELECT_FEED_TYPE:
      return {
        selectedFeedTypeId: (<SelectFeedType>action).id,
        ...state
      };
    case ActionTypes.FEED_TYPE_ERROR:
      return {
        error: (<FeedTypeError>action).error,
        isPending: false,
        ...state
      };
    default:
      return state;
  }
}

function addOne(
  state: FeedTypeState,
  action: AddFeedTypeSuccess
): FeedTypeState {
  const newState = feedTypeAdapter.addOne(action.feedType, state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}

function updateOne(
  state: FeedTypeState,
  action: UpdateFeedTypeSuccess
): FeedTypeState {
  const newState = feedTypeAdapter.updateOne(action.feedType, state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}

function removeOne(
  state: FeedTypeState,
  action: RemoveFeedTypeSuccess
): FeedTypeState {
  const newState = feedTypeAdapter.removeOne(action.id, state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}

function setAll(state: FeedTypeState, action: SetFeedTypes): FeedTypeState {
  const newState = feedTypeAdapter.addAll(action.feedTypes, state);
  return {
    isPending: false,
    error: null,
    ...newState
  };
}
