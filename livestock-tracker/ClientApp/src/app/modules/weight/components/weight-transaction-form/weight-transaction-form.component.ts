import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { environment } from '@env/environment';
import { WeightTransaction } from '@weight/interfaces';

@Component({
  selector: 'app-weight-transaction-form',
  templateUrl: './weight-transaction-form.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.medium }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeightTransactionFormComponent {
  @Input() public set animalId(value: number) {
    if (value == null) {
      return;
    }

    this.form.patchValue({
      animalId: value
    });
  }
  @Input() public set transaction(value: WeightTransaction) {
    if (value == null) {
      return;
    }

    this.form.patchValue(value);
  }
  @Input() public isLoading = false;
  @Input() public isSaving = false;

  @Output() public readonly navigateBack = new EventEmitter();
  @Output() public readonly save = new EventEmitter<WeightTransaction>();

  public readonly form: FormGroup = new FormGroup({
    id: new FormControl(0),
    animalId: new FormControl(0),
    transactionDate: new FormControl(null, Validators.required),
    weight: new FormControl(null, Validators.required)
  });
  public readonly gapSize = '16px';

  public onNavigateBack(): void {
    this.navigateBack.emit();
  }

  public onReset(): void {
    this.form.reset();
  }

  public onSave(): void {
    this.save.emit(this.form.value);
  }
}
