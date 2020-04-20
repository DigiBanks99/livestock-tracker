import * as moment from 'moment';

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Unit } from '@core/models/unit.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-feeding-transaction-form',
  templateUrl: './feeding-transaction-form.component.html',
  styleUrls: ['./feeding-transaction-form.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.medium },
  ],
})
export class FeedingTransactionFormComponent
  implements OnInit, OnChanges, OnDestroy {
  public feedForm: FormGroup;
  @Input() public selectedAnimalId: number;
  @Input() public feedingTransaction: FeedingTransaction = {
    animalId: this.selectedAnimalId,
    feedTypeId: null,
    id: undefined,
    quantity: 0,
    transactionDate: moment().utc().toDate(),
    unitId: 0,
  };
  @Input() isPending: boolean;
  @Input() error: Error;
  @Input() header: string;
  @Input() successMessage: string;
  @Input() feedTypes: FeedType[] = [];
  @Input() unitTypes: Unit[] = [];
  @Output() save = new EventEmitter<FeedingTransaction>();
  @Output() navigateBack = new EventEmitter();

  constructor(private snackbar: MatSnackBar) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.onSaveResponse();

    if (
      (changes.feedingTransaction && changes.feedingTransaction.currentValue) ||
      (changes.selectedAnimalId && changes.selectedAnimalId.currentValue)
    ) {
      this.resetForm();
    }
  }

  public ngOnDestroy(): void {}

  public getHeaderText() {
    return this.header;
  }

  public resetForm(): void {
    if (!this.feedForm) return;

    let animalId = this.selectedAnimalId;
    if (this.feedingTransaction !== null) {
      animalId = this.feedingTransaction.animalId
        ? this.feedingTransaction.animalId
        : animalId;
    }

    this.feedForm.get('id').setValue(this.feedingTransaction.id);
    this.feedForm.get('animalId').setValue(this.feedingTransaction.animalId);
    this.feedForm
      .get('transactionDate')
      .setValue(moment(this.feedingTransaction.transactionDate));
    this.feedForm
      .get('feedTypeId')
      .setValue(this.feedingTransaction.feedTypeId);
    this.feedForm.get('quantity').setValue(this.feedingTransaction.quantity);
    this.feedForm.get('unitId').setValue(this.feedingTransaction.unitId);
    this.feedForm.markAsPristine();
  }

  public submit() {
    if (this.feedForm.valid) {
      this.save.emit(this.feedForm.value);
    }
  }

  public onNavigateBack() {
    this.navigateBack.emit();
  }

  private initForm(): void {
    this.feedForm = new FormGroup({
      id: new FormControl(this.feedingTransaction.id),
      animalId: new FormControl(this.feedingTransaction.animalId),
      transactionDate: new FormControl(
        {
          value: this.feedingTransaction.transactionDate,
          disabled: this.isPending,
        },
        Validators.required
      ),
      feedTypeId: new FormControl(
        { value: this.feedingTransaction.feedTypeId, disabled: this.isPending },
        Validators.required
      ),
      quantity: new FormControl(
        { value: this.feedingTransaction.quantity, disabled: this.isPending },
        [Validators.required, Validators.min(0)]
      ),
      unitId: new FormControl(
        { value: this.feedingTransaction.unitId, disabled: this.isPending },
        Validators.required
      ),
    });

    this.resetForm();
  }

  private onSaveResponse() {
    if (this.feedForm) {
      if (!this.isPending && !this.feedForm.pristine) {
        let message = this.successMessage;
        if (this.error != null) message = this.error.message;
        setTimeout(() => {
          this.snackbar.open(message, 'Dismiss', { duration: 4000 });
          if (!this.error) this.onNavigateBack();
        });
      }
    }
  }
}
