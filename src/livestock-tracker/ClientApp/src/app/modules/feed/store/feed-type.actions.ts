import { FeedType } from '@core/models/feed-type.model';
import { crudActionsFactory } from '@core/store';
import { Action } from '@ngrx/store';

import { FeedTypeKey } from './constants';

export enum FeedTypeActionTypes {
  SelectFeedType = 'SELECT_FEED_TYPE',
  FetchFeedTypes = 'FETCH_FEED_TYPE',
  FetchFeedTypesSucceeded = 'API_FETCH_FEED_TYPE'
}

export class SelectFeedTypeAction implements Action {
  readonly type = FeedTypeActionTypes.SelectFeedType;
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class FetchFeedTypesAction implements Action {
  readonly type = FeedTypeActionTypes.FetchFeedTypes;
  pageNumber: number;
  pageSize: number;
  includeDeleted: boolean;

  constructor(
    pageNumber: number = 0,
    pageSize: number = 10,
    includeDeleted = false
  ) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.includeDeleted = includeDeleted;
  }
}

export const actions = crudActionsFactory<FeedType, number, number>(
  FeedTypeKey
);
