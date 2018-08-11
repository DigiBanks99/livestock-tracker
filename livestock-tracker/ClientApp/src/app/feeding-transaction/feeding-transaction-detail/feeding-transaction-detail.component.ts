import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { map } from '../../../../node_modules/rxjs/operators';
import { Subscription } from '../../../../node_modules/rxjs';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

import * as moment from 'moment';
import { FeedingTransactionService } from '../feeding-transaction.service';
import { FeedingTransaction } from '../feeding-transaction.model';

@Component({
  selector: 'app-feeding-transaction-detail',
  templateUrl: './feeding-transaction-detail.component.html',
  styleUrls: ['./feeding-transaction-detail.component.scss']
})
export class FeedingTransactionDetailComponent implements OnInit, OnDestroy {
  private editID: number;
  private editingStartedSubscription: Subscription;
  private currentFeedingTransaction: FeedingTransaction;

  public feedForm: FormGroup;

  constructor(
    private route: ActivatedRoute, private router: Router, private feedingTransactionService: FeedingTransactionService) {
    this.editID = 0;
    this.editingStartedSubscription = new Subscription();
  }

  ngOnInit() {
    this.setEditId();
  }

  private setEditId() {
    try {
      const idParamObservable = this.route.queryParamMap.pipe(
        map(params => params.get('id') || 'None')
      );
      this.editingStartedSubscription = idParamObservable.subscribe(
        (idParam: string) => {
          if (idParam === 'None') {
            this.fetchFeedingTransaction();
          } else {
            this.editID = +idParam;
            this.fetchFeedingTransaction();
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  private fetchFeedingTransaction(): void {
    this.feedingTransactionService.get(this.editID).subscribe((feedingTransaction: FeedingTransaction) => {
      this.currentFeedingTransaction = feedingTransaction;
      this.initForm();
    });
  }

  private initForm() {
    this.feedForm = new FormGroup({
      transactionDate: new FormControl(moment(this.currentFeedingTransaction.transactionDate), Validators.required),
      feedID: new FormControl(moment(this.currentFeedingTransaction.feedID), Validators.required),
      quantity: new FormControl(moment(this.currentFeedingTransaction.quantity), [Validators.required, Validators.min(0)]),
      unitTypeCode: new FormControl(moment(this.currentFeedingTransaction.unitTypeCode), Validators.required)
    });
  }

  public ngOnDestroy(): void {
    this.editingStartedSubscription.unsubscribe();
  }

}
