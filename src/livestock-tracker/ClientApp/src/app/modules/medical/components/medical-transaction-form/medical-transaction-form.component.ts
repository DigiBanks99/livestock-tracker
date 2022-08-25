import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  SecurityContext
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  DomSanitizer,
  SafeHtml
} from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MedicalTransaction } from '@core/models/medical-transaction.model';
import { MedicineType } from '@core/models/medicine-type.model';
import { Unit } from '@core/models/unit.model';
import { environment } from '@env/environment';
import { MatDatepickerModule } from '@matheo/datepicker';
import { MatDateFnsModule } from '@matheo/datepicker/date-fns';
import { AnimalSelectModule } from '@shared/components';

@Component({
  selector: 'app-medical-transaction-form',
  templateUrl: './medical-transaction-form.component.html',
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'P',
          datetimeInput: 'yyyy/MM/dd, HH:mm',
          timeInput: 'H:mm',
          monthInput: 'MMM',
          yearInput: 'yyyy'
        },
        display: {
          dateInput: 'P',
          datetimeInput: 'yyyy/MM/dd, HH:mm',
          timeInput: 'p',
          monthInput: 'MMM yyyy',
          yearInput: 'yyyy',
          dateA11yLabel: 'PP',
          monthLabel: 'MMM',
          monthDayLabel: 'MMM d',
          monthDayA11yLabel: 'MMMM d',
          monthYearLabel: 'MMM yyyy',
          monthYearA11yLabel: 'MMMM yyyy',
          timeLabel: 'p'
        }
      }
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicalTransactionFormComponent {
  @Input() public backLink = '../';
  @Input() public medicineTypes: MedicineType[] = [];
  @Input() public units: Unit[] = [];
  @Input() public isLoading = false;
  @Input() public isSaving = false;

  @Input()
  public set transaction(value: MedicalTransaction) {
    if (value == null) {
      return;
    }

    this._transaction = value;
    this.form.patchValue(value);
  }

  @Input()
  public set animalId(value: number) {
    if (value == null) {
      return;
    }

    this.form.patchValue({
      animalId: value
    });
  }

  @Output() public readonly save = new EventEmitter<MedicalTransaction>();
  public readonly form = new FormGroup({
    id: new FormControl(0),
    animalId: new FormControl(0),
    medicineId: new FormControl(null, Validators.required),
    transactionDate: new FormControl(null, Validators.required),
    dose: new FormControl(null, [Validators.required]),
    unitId: new FormControl(null, [Validators.required])
  });

  public get transactionDateCtrl(): FormControl {
    return <FormControl>this.form.controls.transactionDate;
  }

  public get dateErrorMessage(): SafeHtml {
    let sb = '';
    const append = (appendage: string) =>
      sb.length > 0 ? `${sb}<li>${appendage}</li>` : `<li>${appendage}</li>`;

    if (this.transactionDateCtrl.errors.required) {
      sb = append('Required');
    }

    if (this.transactionDateCtrl.errors.matDatepickerParse) {
      const format = environment.myFormats.medium;
      sb = append(
        `The date is not in a known format. Expected format is: ${format}`
      );
    }

    return this._sanitizer.sanitize(SecurityContext.HTML, `<ul>${sb}</ul>`);
  }

  private _transaction: MedicalTransaction | null = null;

  constructor(private readonly _sanitizer: DomSanitizer) {}

  public onReset(): void {
    this.form.reset();
    this.form.patchValue({ ...this._transaction });
  }

  public onSave(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}

@NgModule({
  declarations: [MedicalTransactionFormComponent],
  exports: [MedicalTransactionFormComponent],
  imports: [
    AnimalSelectModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDateFnsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class MedicalTransactionFormComponentModule {}
