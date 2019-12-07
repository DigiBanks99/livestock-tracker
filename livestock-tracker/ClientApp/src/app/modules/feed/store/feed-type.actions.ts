import { FeedType } from '@core/models/feed-type.model';
import { crudActionsFactory } from '@core/store';
import { Action } from '@ngrx/store';

import { FeedTypeKey } from './constants';

export enum ActionTypes {
  SELECT_FEED_TYPE = 'SELECT_FEED_TYPE'
}

export class SelectFeedType implements Action {
  readonly type = ActionTypes.SELECT_FEED_TYPE;
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export const actions = crudActionsFactory<FeedType, number>(FeedTypeKey);
