import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FeedStoreConstants } from './constants';
import { FeedTypeEffects } from './feed-type.effects';
import { feedTypeReducer } from './feed-type.reducer';
import { FeedingTransactionEffects } from './feeding-transaction.effect';
import { feedingTransactionReducer } from './feeding-transaction.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeedStoreConstants.Feed.StoreKey, feedTypeReducer),
    StoreModule.forFeature(
      FeedStoreConstants.Transactions.StoreKey,
      feedingTransactionReducer
    ),
    EffectsModule.forFeature([FeedTypeEffects, FeedingTransactionEffects])
  ]
})
export class FeedStoreModule {}
