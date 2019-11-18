import { Observable } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { feedingTransactionStore, feedTypeStore } from '@feed-store';
import { UpdateFeedTransaction } from '@feed/store/feeding-transaction.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-feeding-transaction-detail',
  templateUrl: './feeding-transaction-detail.component.html',
  styleUrls: ['./feeding-transaction-detail.component.scss']
})
export class FeedingTransactionDetailComponent implements OnInit, OnDestroy {
  public selectedAnimalId$: Observable<number>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
  public selectedFeedingTransaction$: Observable<FeedingTransaction>;
  public feedTypes$: Observable<FeedType[]>;
  public unitTypes$: Observable<Unit[]>;

  constructor(private store: Store<AppState>, private router: Router) {}

  public ngOnInit() {
    this.selectedAnimalId$ = this.store.pipe(select(getSelectedAnimalId));
    this.isPending$ = this.store.pipe(
      select(
        feedingTransactionStore.selectors.getFeedingTransactionPendingState
      )
    );
    this.error$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getFeedingTransactionErrorState)
    );
    this.selectedFeedingTransaction$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getSelectedFeedingTransaction)
    );
    this.feedTypes$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypes)
    );
    this.unitTypes$ = this.store.pipe(select(getUnits));
  }

  public ngOnDestroy() {}

  public onSave(transaction: FeedingTransaction) {
    this.store.dispatch(new UpdateFeedTransaction(transaction));
  }

  public onNavigateBack() {
    this.router.navigate(['/feeding-transaction']);
  }
}
