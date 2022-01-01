import { Subject } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MedicalTransaction } from '@core/models/medical-transaction.model';
import { MedicineType } from '@core/models/medicine-type.model';
import { Unit } from '@core/models/unit.model';

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
export class MedicalTransactionFormComponent implements OnDestroy, OnChanges {
  @Input() public selectedAnimalId = 0;
  @Input() public medicalTransaction: MedicalTransaction = {
    animalId: this.selectedAnimalId,
    dose: null,
    id: 0,
    medicineId: null,
    transactionDate: new Date(),
    unitId: null
  };
  @Input() public medicineTypes: MedicineType[] = [];
  @Input() public units: Unit[] = [];
  @Input() isPending = false;

  @Output() public save = new EventEmitter<MedicalTransaction>();

  public form: FormGroup;
  public medicineTypeControl: FormControl;
  public transactionDateControl: FormControl;
  public doseControl: FormControl;
  public unitControl: FormControl;

  private destroyed$ = new Subject<void>();

  constructor() {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (null != changes.medicalTransaction) {
      this.form.patchValue({
        ...changes.medicalTransaction.currentValue,
        animalId: this.selectedAnimalId
      });
    }

    if (null != changes.selectedAnimalId) {
      this.form.patchValue({
        animalId: changes.selectedAnimalId.currentValue
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onSave(): void {
    if (this.form.valid) {
      this.save.next(this.form.value);
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(this.medicalTransaction.id),
      animalId: new FormControl(this.selectedAnimalId),
      medicineId: new FormControl(this.medicalTransaction.medicineId, [
        Validators.required
      ]),
      transactionDate: new FormControl(
        this.medicalTransaction.transactionDate,
        [Validators.required]
      ),
      dose: new FormControl(this.medicalTransaction.dose, [
        Validators.required
      ]),
      unitId: new FormControl(this.medicalTransaction.unitId, [
        Validators.required
      ])
    });
  }
}
