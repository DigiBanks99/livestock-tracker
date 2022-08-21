import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  SecurityContext
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MAT_DATE_FORMATS, MatOptionModule } from '@angular/material/core';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Unit } from '@core/models/unit.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@matheo/datepicker';
import { AnimalSelectModule } from '@shared/components';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatDateFnsModule } from '@matheo/datepicker/date-fns';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feeding-transaction-form',
  templateUrl: './feeding-transaction-form.component.html',
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
          datetimeInput: 'Pp',
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
export class FeedingTransactionFormComponent {
  @Input() public backLink = '../';
  @Input() public isLoading = false;
  @Input() public isSaving = false;
  @Input() public feedTypes: FeedType[] = [];
  @Input() public units: Unit[] = [];
  @Output() public readonly save = new EventEmitter<FeedingTransaction>();
  public readonly form = new FormGroup({
    id: new FormControl(0),
    animalId: new FormControl(0),
    feedTypeId: new FormControl(null, Validators.required),
    transactionDate: new FormControl(null, Validators.required),
    quantity: new FormControl(null, [Validators.required]),
    unitId: new FormControl(null, [Validators.required])
  });
  private _transaction: FeedingTransaction | null = null;

  constructor(private readonly _sanitizer: DomSanitizer) {}

  @Input()
  public set animalId(value: number) {
    if (value == null) {
      return;
    }

    this.form.patchValue({
      animalId: value
    });
  }

  @Input()
  public set feedingTransaction(value: FeedingTransaction) {
    if (value == null) {
      return;
    }

    this._transaction = value;
    this.form.patchValue(value);
  }

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

  public onReset(): void {
    this.form.reset();
    this.form.patchValue({ ...this._transaction });
  }

  public onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}

@NgModule({
  declarations: [FeedingTransactionFormComponent],
  exports: [FeedingTransactionFormComponent],
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
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class FeedingTransactionFormComponentModule {}
