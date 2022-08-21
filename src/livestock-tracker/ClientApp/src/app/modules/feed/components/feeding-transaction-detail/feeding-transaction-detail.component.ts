import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { FeedStore } from '@feed-store';
import { FetchFeedTypesAction } from '@feed/store/feed-type.actions';
import {
  actions,
  FetchSingleFeedTransactionAction
} from '@feed/store/feeding-transaction.actions';
import { select, Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

import { FeedingTransactionFormComponentModule } from '../feeding-transaction-form/feeding-transaction-form.component';

@Component({
  selector: 'app-feeding-transaction-detail',
  templateUrl: './feeding-transaction-detail.component.html'
})
export class FeedingTransactionDetailComponent implements OnInit, OnDestroy {
  public selectedAnimalId$: Observable<number>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
  public selectedFeedingTransaction$: Observable<FeedingTransaction>;
  public feedTypes$: Observable<FeedType[]>;
  public unitTypes$: Observable<Unit[]>;

  public selectedAnimalId = 0;
  public pending = true;

  private destroyed$ = new Subject();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params: Params) => {
        this.store.dispatch(
          new FetchSingleFeedTransactionAction(params.animalId, params.id)
        );
      });
    this.store.dispatch(new FetchFeedTypesAction(0, 100, false));
    this.selectedAnimalId$ = this.store.pipe(
      select(getSelectedAnimalId),
      takeUntil(this.destroyed$)
    );
    this.isPending$ = this.store.pipe(
      select(FeedStore.Transactions.selectors.isPendingTransaction),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(FeedStore.Transactions.selectors.error),
      takeUntil(this.destroyed$)
    );
    this.selectedFeedingTransaction$ = this.store.pipe(
      select(FeedStore.Transactions.selectors.selectedFeedingTransaction),
      takeUntil(this.destroyed$)
    );
    this.feedTypes$ = this.store.pipe(
      select(FeedStore.Feed.selectors.feedTypes),
      takeUntil(this.destroyed$)
    );
    this.unitTypes$ = this.store.pipe(
      select(getUnits),
      takeUntil(this.destroyed$)
    );

    this.isPending$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((pending: boolean) => (this.pending = pending));

    this.selectedAnimalId$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((id: number) => (this.selectedAnimalId = id));
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

@NgModule({
  declarations: [FeedingTransactionDetailComponent],
  exports: [FeedingTransactionDetailComponent],
  imports: [CommonModule, FeedingTransactionFormComponentModule]
})
export class FeedingTransactionDetailComponentModule {}