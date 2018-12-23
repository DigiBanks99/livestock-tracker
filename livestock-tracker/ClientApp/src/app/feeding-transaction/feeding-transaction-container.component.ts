import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '@store';
import { Observable } from 'rxjs';
import { Livestock } from '@livestock/livestock.model';
import { getSelectedAnimal, getAllFeedingTransactions } from '@store';
import { FeedingTransaction } from './feeding-transaction.model';
import { Router } from '@angular/router';
import {
  SelectFeedTransaction,
  RemoveFeedTransaction
} from '@feeding-transaction-store/actions';

@Component({
  selector: 'app-feeding-transaction-container',
  template: `
    <app-feeding-transaction
      [currentAnimal]="selectedAnimal$ | async"
      [feedingTransactions]="feedingTransactions$ | async"
      (addTransaction)="onAddTransaction($event)"
      (showDetail)="onShowDetail($event)"
      (removeTransaction)="onDelete($event)"
    ></app-feeding-transaction>
  `
})
export class FeedingTransactionContainerComponent implements OnInit {
  public selectedAnimal$: Observable<Livestock>;
  public feedingTransactions$: Observable<FeedingTransaction[]>;

  constructor(private store: Store<State>, private router: Router) {}

  public ngOnInit() {
    this.selectedAnimal$ = this.store.pipe(select(getSelectedAnimal));
    this.feedingTransactions$ = this.store.pipe(
      select(getAllFeedingTransactions)
    );
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
