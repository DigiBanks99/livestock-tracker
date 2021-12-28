import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SecurityContext
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { WeightTransaction } from '@weight/interfaces';

@Component({
  selector: 'app-weight-transaction-form',
  templateUrl: './weight-transaction-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  ]
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

  constructor(private readonly _sanitizer: DomSanitizer) {}

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
