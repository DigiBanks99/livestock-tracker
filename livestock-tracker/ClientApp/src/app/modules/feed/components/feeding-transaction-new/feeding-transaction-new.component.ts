import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { feedingTransactionStore, feedTypeStore } from '@feed-store';
import { FetchFeedTypes } from '@feed/store/feed-type.actions';
import { actions } from '@feed/store/feeding-transaction.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-feeding-transaction-new',
  templateUrl: './feeding-transaction-new.component.html',
})
export class FeedingTransactionNewComponent implements OnDestroy, OnInit {
  public selectedAnimalId$: Observable<number>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
  public feedTypes$: Observable<FeedType[]>;
  public unitTypes$: Observable<Unit[]>;

  private destroyed$ = new Subject<void>();

  constructor(private store: Store<AppState>, private router: Router) {}

  public ngOnInit(): void {
    this.store.dispatch(new FetchFeedTypes(0, 100, false));
    this.selectedAnimalId$ = this.store.pipe(
      select(getSelectedAnimalId),
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
    this.feedTypes$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypes),
      takeUntil(this.destroyed$)
    );
    this.unitTypes$ = this.store.pipe(
      select(getUnits),
      takeUntil(this.destroyed$)
    );
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onSave(transaction: FeedingTransaction) {
    this.store.dispatch(actions.addItem(transaction));
  }

  public onNavigateBack() {
    this.router.navigate(['/feeding-transaction']);
  }
}
