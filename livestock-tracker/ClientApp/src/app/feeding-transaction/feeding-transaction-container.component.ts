import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '@store';
import { Observable } from 'rxjs';
import { Livestock } from '@livestock/livestock.model';
import { selectors } from '@store';
import { FeedingTransaction } from './feeding-transaction.model';
import { Router } from '@angular/router';
import {
  SelectFeedTransaction,
  RemoveFeedTransaction
} from '@feeding-transaction-store/actions';
import { FeedType } from '@feed-type/feed-type.model';
import { Unit } from '@unit/unit.model';

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

  constructor(private store: Store<State>, private router: Router) {}

  public ngOnInit() {
    this.selectedAnimal$ = this.store.pipe(
      select(selectors.animalSelectors.getSelectedAnimal)
    );
    this.feedingTransactions$ = this.store.pipe(
      select(selectors.feedingTransactionSelectors.getAllFeedingTransactions)
    );
    this.feedTypes$ = this.store.pipe(
      select(selectors.feedTypeSelectors.getFeedTypes)
    );
    this.units$ = this.store.pipe(select(selectors.unitSelectors.getUnits));
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
    this.store.dispatch(new RemoveFeedTransaction(id));
  }
}
