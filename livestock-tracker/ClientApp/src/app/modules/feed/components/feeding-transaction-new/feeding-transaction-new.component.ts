import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { feedingTransactionStore, feedTypeStore } from '@feed-store';
import { AddFeedTransaction } from '@feed/store/feeding-transaction.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-feeding-transaction-new',
  templateUrl: './feeding-transaction-new.component.html'
})
export class FeedingTransactionNewComponent implements OnInit {
  public selectedAnimalId$: Observable<number>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
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
    this.feedTypes$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypes)
    );
    this.unitTypes$ = this.store.pipe(select(getUnits));
  }

  public onSave(transaction: FeedingTransaction) {
    this.store.dispatch(new AddFeedTransaction(transaction));
  }

  public onNavigateBack() {
    this.router.navigate(['/feeding-transaction']);
  }
}
