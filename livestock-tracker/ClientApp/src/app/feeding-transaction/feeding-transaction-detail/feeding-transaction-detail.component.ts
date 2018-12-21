import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getSelectedAnimalId,
  getSelectedFeedingTransaction,
  State
} from '@store';
import { FeedingTransaction } from '@feeding-transaction/feeding-transaction.model';
import { AddFeedTransaction } from '@feeding-transaction-store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feeding-transaction-detail',
  templateUrl: './feeding-transaction-detail.component.html',
  styleUrls: ['./feeding-transaction-detail.component.scss']
})
export class FeedingTransactionDetailComponent implements OnInit {
  public selectedAnimalId$: Observable<number>;
  public selectedFeedingTransaction$: Observable<FeedingTransaction>;

  constructor(private store: Store<State>, private router: Router) {}

  public ngOnInit() {
    this.selectedAnimalId$ = this.store.pipe(select(getSelectedAnimalId));
    this.selectedFeedingTransaction$ = this.store.pipe(
      select(getSelectedFeedingTransaction)
    );
  }

  public onSave(transaction: FeedingTransaction) {
    this.store.dispatch(new AddFeedTransaction(transaction));
  }

  public onNavigateBack() {
    this.router.navigate(['/feeding-transaction']);
  }
}
