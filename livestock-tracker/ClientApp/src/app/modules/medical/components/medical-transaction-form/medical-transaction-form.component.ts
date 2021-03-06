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
import { environment } from '@env/environment';

@Component({
  selector: 'app-medical-transaction-form',
  templateUrl: './medical-transaction-form.component.html',
  styleUrls: ['./medical-transaction-form.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.medium },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalTransactionFormComponent implements OnDestroy, OnChanges {
  @Input() public selectedAnimalId = 0;
  @Input() public medicalTransaction: MedicalTransaction = {
    animalId: this.selectedAnimalId,
    dose: null,
    id: 0,
    medicineId: null,
    transactionDate: new Date(),
    unitId: null,
  };
  @Input() public medicineTypes: MedicineType[] = [];
  @Input() public units: Unit[] = [];

  @Output() public save = new EventEmitter<MedicalTransaction>();

  public medicalTransactionForm: FormGroup;
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
      this.medicalTransactionForm.patchValue({
        ...changes.medicalTransaction.currentValue,
        animalId: this.selectedAnimalId,
      });
    }

    if (null != changes.selectedAnimalId) {
      this.medicalTransactionForm.patchValue({
        animalId: changes.selectedAnimalId.currentValue,
      });
    }
  }

  public onSave(): void {
    if (this.medicalTransactionForm.valid) {
      this.save.next(this.medicalTransactionForm.value);
    }
  }

  private initForm(): void {
    this.medicalTransactionForm = new FormGroup({
      id: new FormControl(this.medicalTransaction.id),
      animalId: new FormControl(this.selectedAnimalId),
      medicineId: new FormControl(this.medicalTransaction.medicineId, [
        Validators.required,
      ]),
      transactionDate: new FormControl(
        this.medicalTransaction.transactionDate,
        [Validators.required]
      ),
      dose: new FormControl(this.medicalTransaction.dose, [
        Validators.required,
      ]),
      unitId: new FormControl(this.medicalTransaction.unitId, [
        Validators.required,
      ]),
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
