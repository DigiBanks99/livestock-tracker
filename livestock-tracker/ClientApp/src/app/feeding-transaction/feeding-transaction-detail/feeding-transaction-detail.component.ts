import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { map } from '../../../../node_modules/rxjs/operators';
import { Subscription } from '../../../../node_modules/rxjs';
import {
  FormGroup,
  FormControl,
  Validators
} from '../../../../node_modules/@angular/forms';

import * as moment from 'moment';
import { FeedingTransactionService } from '../feeding-transaction.service';
import { FeedingTransaction } from '../feeding-transaction.model';
import { isNullOrUndefined } from 'util';
import { LivestockService } from '../../livestock/livestock.service';
import { AnimalStore } from '../../store/animal.store';
import { Livestock } from '../../livestock/livestock.model';

@Component({
  selector: 'app-feeding-transaction-detail',
  templateUrl: './feeding-transaction-detail.component.html',
  styleUrls: ['./feeding-transaction-detail.component.scss']
})
export class FeedingTransactionDetailComponent
  implements OnInit, OnDestroy, DoCheck {
  private editID: number;
  private editingStartedSubscription: Subscription;
  private fetchFeedingTransactionSubscription: Subscription;
  private currentFeedingTransaction: FeedingTransaction;

  public feedForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private feedingTransactionService: FeedingTransactionService,
    private livestockService: LivestockService
  ) {
    this.editID = 0;
    this.editingStartedSubscription = new Subscription();
    this.fetchFeedingTransactionSubscription = new Subscription();

    this.initForm();
  }

  public ngOnInit(): void {
    this.setEditId();
  }

  public ngDoCheck(): void {
    console.log('checking');
  }

  public getHeaderText() {
    if (isNullOrUndefined(this.editID) || this.editID === 0) {
      return 'New Feeding Transaction';
    } else {
      return 'Editing Feeding Transaction';
    }
  }

  public getAnimal() {
    return this.livestockService.getAnimal(this.editID);
  }

  public getAnimalIcon(animal: Livestock): string {
    return this.livestockService.getSvgIcon(animal);
  }

  private setEditId(): void {
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
    this.fetchFeedingTransactionSubscription = this.feedingTransactionService
      .getSingle(this.editID)
      .subscribe((feedingTransaction: FeedingTransaction) => {
        this.currentFeedingTransaction = feedingTransaction;
        this.resetForm();
      });
  }

  private initForm(): void {
    this.feedForm = new FormGroup({
      transactionDate: new FormControl(moment(), Validators.required),
      feedID: new FormControl(null, Validators.required),
      quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
      unitTypeCode: new FormControl(null, Validators.required)
    });
  }

  public resetForm(): void {
    this.feedForm
      .get('transactionDate')
      .setValue(moment(this.currentFeedingTransaction.transactionDate));
    this.feedForm.get('feedID').setValue(this.currentFeedingTransaction.feedID);
    this.feedForm
      .get('quantity')
      .setValue(this.currentFeedingTransaction.quantity);
    this.feedForm
      .get('unitTypeCode')
      .setValue(this.currentFeedingTransaction.unitTypeCode);
    this.feedForm.markAsPristine();
  }

  public ngOnDestroy(): void {
    this.editingStartedSubscription.unsubscribe();
    this.fetchFeedingTransactionSubscription.unsubscribe();
  }
}
