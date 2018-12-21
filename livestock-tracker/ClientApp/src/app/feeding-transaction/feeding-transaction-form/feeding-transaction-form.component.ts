import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as moment from 'moment';
import { FeedingTransaction } from '@feeding-transaction/feeding-transaction.model';

@Component({
  selector: 'app-feeding-transaction-form',
  templateUrl: './feeding-transaction-form.component.html',
  styleUrls: ['./feeding-transaction-form.component.scss']
})
export class FeedingTransactionFormComponent implements OnInit, OnDestroy {
  public feedForm: FormGroup;
  @Input() public selectedAnimalId: number;
  @Input() public feedingTransaction: FeedingTransaction = {
    animalID: this.selectedAnimalId,
    feedID: null,
    id: undefined,
    quantity: 0,
    transactionDate: moment()
      .utc()
      .toDate(),
    unitTypeCode: 0
  };
  @Input() header: string;
  @Input() successMessage: string;
  @Output() save = new EventEmitter<FeedingTransaction>();
  @Output() navigateBack = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnDestroy(): void {}

  public getHeaderText() {
    return this.header;
  }

  public resetForm(): void {
    this.feedForm
      .get('transactionDate')
      .setValue(moment(this.feedingTransaction.transactionDate));
    this.feedForm.get('feedID').setValue(this.feedingTransaction.feedID);
    this.feedForm.get('quantity').setValue(this.feedingTransaction.quantity);
    this.feedForm
      .get('unitTypeCode')
      .setValue(this.feedingTransaction.unitTypeCode);
    this.feedForm.markAsPristine();
  }

  private initForm(): void {
    this.feedForm = new FormGroup({
      transactionDate: new FormControl(moment(), Validators.required),
      feedID: new FormControl(null, Validators.required),
      quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
      unitTypeCode: new FormControl(null, Validators.required)
    });

    this.resetForm();
  }

  public submit() {
    if (this.feedForm.valid) {
      this.save.emit(this.feedForm.value);
    }
  }

  public onNavigateBack() {
    this.navigateBack.emit();
  }
}
