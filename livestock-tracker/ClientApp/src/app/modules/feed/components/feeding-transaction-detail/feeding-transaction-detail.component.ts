import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { feedingTransactionStore, feedTypeStore } from '@feed-store';
import { actions } from '@feed/store/feeding-transaction.actions';
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
  public destroyed$ = new Subject();

  constructor(private store: Store<AppState>, private router: Router) {}

  public ngOnInit() {
    this.selectedAnimalId$ = this.store.pipe(
      select(getSelectedAnimalId),
      tap(value => console.log(`selectedAnimalId: ${value}`)),
      takeUntil(this.destroyed$)
    );
    this.isPending$ = this.store.pipe(
      select(
        feedingTransactionStore.selectors.getFeedingTransactionPendingState
      ),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getFeedingTransactionErrorState),
      takeUntil(this.destroyed$)
    );
    this.selectedFeedingTransaction$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getSelectedFeedingTransaction),
      takeUntil(this.destroyed$)
    );
    this.feedTypes$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypes),
      takeUntil(this.destroyed$)
    );
    this.unitTypes$ = this.store.pipe(
      select(getUnits),
      takeUntil(this.destroyed$)
    );
  }

  public ngOnDestroy() {
    this.destroyed$.complete();
  }

  public onSave(transaction: FeedingTransaction) {
    this.store.dispatch(actions.updateItem(transaction, transaction.id));
  }

  public onNavigateBack() {
    this.router.navigate(['/feeding-transaction']);
  }
}
