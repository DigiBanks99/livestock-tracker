import { FeedType } from '@core/models';

import { CrudState } from './crud/crud-state.interface';

export interface FeedTypeState extends CrudState<FeedType, number> {}
