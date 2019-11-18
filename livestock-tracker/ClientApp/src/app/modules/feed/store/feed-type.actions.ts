import { FeedType } from '@core/models/feed-type.model';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export enum ActionTypes {
  ADD_FEED_TYPE = 'ADD_FEED_TYPE',
  ADD_FEED_TYPE_SUCCESS = 'ADD_FEED_TYPE_SUCCESS',
  UPDATE_FEED_TYPE = 'UPDATE_FEED_TYPE',
  UPDATE_FEED_TYPE_SUCCESS = 'UPDATE_FEED_TYPE_SUCCESS',
  REMOVE_FEED_TYPE = 'REMOVE_FEED_TYPE',
  REMOVE_FEED_TYPE_SUCCESS = 'REMOVE_FEED_TYPE_SUCCESS',
  FETCH_FEED_TYPES = 'FETCH_FEED_TYPES',
  SET_FEED_TYPES = 'SET_FEED_TYPES',
  SELECT_FEED_TYPE = 'SELECT_FEED_TYPE',
  FEED_TYPE_ERROR = 'FEED_TYPE_ERROR'
}

export class AddFeedType implements Action {
  readonly type = ActionTypes.ADD_FEED_TYPE;
  feedType: FeedType;

  constructor(feedType: FeedType) {
    this.feedType = feedType;
  }
}

export class AddFeedTypeSuccess implements Action {
  readonly type = ActionTypes.ADD_FEED_TYPE_SUCCESS;
  feedType: FeedType;

  constructor(feedType: FeedType) {
    this.feedType = feedType;
  }
}

export class UpdateFeedType implements Action {
  readonly type = ActionTypes.UPDATE_FEED_TYPE;
  feedType: FeedType;

  constructor(feedType: FeedType) {
    this.feedType = feedType;
  }
}

export class UpdateFeedTypeSuccess implements Action {
  readonly type = ActionTypes.UPDATE_FEED_TYPE_SUCCESS;
  feedType: Update<FeedType>;

  constructor(feedType: Update<FeedType>) {
    this.feedType = feedType;
  }
}

export class RemoveFeedType implements Action {
  readonly type = ActionTypes.REMOVE_FEED_TYPE;
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class RemoveFeedTypeSuccess implements Action {
  readonly type = ActionTypes.REMOVE_FEED_TYPE_SUCCESS;
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class FetchFeedTypes implements Action {
  readonly type = ActionTypes.FETCH_FEED_TYPES;
}

export class SetFeedTypes implements Action {
  readonly type = ActionTypes.SET_FEED_TYPES;
  feedTypes: FeedType[];

  constructor(feedTypes: FeedType[]) {
    this.feedTypes = feedTypes;
  }
}

export class SelectFeedType implements Action {
  readonly type = ActionTypes.SELECT_FEED_TYPE;
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class FeedTypeError implements Action {
  readonly type = ActionTypes.FEED_TYPE_ERROR;
  error: Error;

  constructor(error: Error) {
    this.error = error;
  }
}
