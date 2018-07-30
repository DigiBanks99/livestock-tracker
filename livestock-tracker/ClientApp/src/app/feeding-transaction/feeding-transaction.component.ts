import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedingTransactionService } from './feeding-transaction.service';
import { Subscription } from '../../../node_modules/rxjs';
import { FeedingTransaction } from './feeding-transaction.model';

@Component({
  selector: 'app-feeding-transaction',
  templateUrl: './feeding-transaction.component.html',
  styleUrls: ['./feeding-transaction.component.scss']
})
export class FeedingTransactionComponent implements OnInit, OnDestroy {
  private feedingTransactionListChanged: Subscription;

  public feedingTransactions: FeedingTransaction[];

  constructor(private feedingTransactionService: FeedingTransactionService) {
    this.feedingTransactionListChanged = new Subscription();
    this.feedingTransactions = [];
  }

  public ngOnInit(): void {
    this.init();
  }

  private init() {
    this.feedingTransactionListChanged = this.feedingTransactionService.get().subscribe((data: Object) => {
      for (const item of <FeedingTransaction[]>data) {
        this.feedingTransactions.push(item);
      }
    });
  }

  public ngOnDestroy(): void {
    this.feedingTransactionListChanged.unsubscribe();
  }
}
