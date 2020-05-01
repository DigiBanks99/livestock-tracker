import { FeedType } from '@core/models/feed-type.model';
import { CrudActions, crudActionsFactory, PayloadAction } from '@core/store';
import { Action } from '@ngrx/store';

import { FeedTypeKey } from './constants';

export enum ActionTypes {
  SELECT_FEED_TYPE = 'SELECT_FEED_TYPE',
  FETCH_FEED_TYPES = 'FETCH_FEED_TYPE',
  API_FETCH_FEED_TYPES = 'API_FETCH_FEED_TYPE',
}

export class SelectFeedType implements Action {
  readonly type = ActionTypes.SELECT_FEED_TYPE;
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class FetchFeedTypes implements Action {
  readonly type = ActionTypes.FETCH_FEED_TYPES;
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

const crudActions = crudActionsFactory<FeedType, number>(FeedTypeKey);

export const actions: CrudActions<FeedType, number> = {
  ...crudActions,
};
