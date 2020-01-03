import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Livestock } from '@core/models/livestock.model';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import { getSelectedAnimal, getUnits } from '@core/store/selectors';
import { feedingTransactionStore, feedTypeStore } from '@feed-store';
import {
  actions,
  SelectFeedTransaction
} from '@feed/store/feeding-transaction.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-feeding-transaction-container',
  template: `
    <app-feeding-transaction
      [currentAnimal]="selectedAnimal$ | async"
      [feedingTransactions]="feedingTransactions$ | async"
      [feedTypes]="feedTypes$ | async"
      [unitTypes]="units$ | async"
      (addTransaction)="onAddTransaction($event)"
      (showDetail)="onShowDetail($event)"
      (removeTransaction)="onDelete($event)"
    ></app-feeding-transaction>
  `
})
export class FeedingTransactionContainerComponent implements OnInit {
  public selectedAnimal$: Observable<Livestock>;
  public feedingTransactions$: Observable<FeedingTransaction[]>;
  public feedTypes$: Observable<FeedType[]>;
  public units$: Observable<Unit[]>;

  constructor(private store: Store<AppState>, private router: Router) {}

  public ngOnInit() {
    this.selectedAnimal$ = this.store.pipe(select(getSelectedAnimal));
    this.feedingTransactions$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getAllFeedingTransactions)
    );
    this.feedTypes$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypes)
    );
    this.units$ = this.store.pipe(select(getUnits));
  }

  public onAddTransaction(animalId: number) {
    this.router.navigate(['/feeding-transaction', animalId, 'new']);
  }

  public onShowDetail(identifier: FeedingTransaction) {
    this.store.dispatch(new SelectFeedTransaction(identifier.id));
    this.router.navigate([
      '/feeding-transaction',
      identifier.animalID,
      identifier.id,
      'edit'
    ]);
  }

  public onDelete(id: number) {
    this.store.dispatch(actions.deleteItem(id));
  }
}
