import { FeedType } from '@core/models';
import { EntityState } from '@ngrx/entity';

export interface FeedTypeState extends EntityState<FeedType> {
  selectedFeedTypeId: number;
  isPending: boolean;
  error?: Error;
}
