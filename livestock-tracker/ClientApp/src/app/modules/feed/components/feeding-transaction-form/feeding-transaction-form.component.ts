import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Unit } from '@core/models/unit.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-feeding-transaction-form',
  templateUrl: './feeding-transaction-form.component.html',
  styleUrls: ['./feeding-transaction-form.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.medium }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedingTransactionFormComponent implements OnChanges {
  @Input() public selectedAnimalId = 0;
  @Input() public feedingTransaction: FeedingTransaction = {
    animalId: this.selectedAnimalId,
    feedTypeId: null,
    id: 0,
    quantity: null,
    transactionDate: new Date(),
    unitId: null
  };
  @Input() isPending: boolean;
  @Input() error: Error;
  @Input() header: string;
  @Input() successMessage: string;
  @Input() feedTypes: FeedType[] = [];
  @Input() unitTypes: Unit[] = [];
  @Output() save = new EventEmitter<FeedingTransaction>();
  @Output() navigateBack = new EventEmitter();

  public feedForm: FormGroup;

  constructor() {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (null != changes.feedingTransaction) {
      this.feedForm.patchValue({
        ...changes.feedingTransaction.currentValue,
        animalId: this.selectedAnimalId
      });
    }

    if (null != changes.selectedAnimalId) {
      this.feedForm.patchValue({
        animalId: changes.selectedAnimalId.currentValue
      });
    }
  }

  public onSave() {
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
          disabled: this.isPending
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
      )
    });
  }
}
