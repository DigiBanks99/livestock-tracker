import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as moment from 'moment';
import { FeedingTransaction } from '@feeding-transaction/feeding-transaction.model';
import { MAT_DATE_FORMATS } from '@angular/material';
import { FeedType } from '@feed-type/feed-type.model';
import { Unit } from '@unit/unit.model';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
@Component({
  selector: 'app-feeding-transaction-form',
  templateUrl: './feeding-transaction-form.component.html',
  styleUrls: ['./feeding-transaction-form.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class FeedingTransactionFormComponent
  implements OnInit, OnChanges, OnDestroy {
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
  @Input() feedTypes: FeedType[] = [];
  @Input() unitTypes: Unit[] = [];
  @Output() save = new EventEmitter<FeedingTransaction>();
  @Output() navigateBack = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.feedingTransaction.currentValue) this.resetForm();
  }

  public ngOnDestroy(): void {}

  public getHeaderText() {
    return this.header;
  }

  public resetForm(): void {
    let animalID = this.selectedAnimalId;
    if (this.feedingTransaction !== null) {
      animalID = this.feedingTransaction.animalID
        ? this.feedingTransaction.animalID
        : animalID;
    }

    this.feedForm.get('id').setValue(this.feedingTransaction.id);
    this.feedForm.get('animalID').setValue(animalID);
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
      id: new FormControl(null),
      animalID: new FormControl(this.selectedAnimalId),
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
