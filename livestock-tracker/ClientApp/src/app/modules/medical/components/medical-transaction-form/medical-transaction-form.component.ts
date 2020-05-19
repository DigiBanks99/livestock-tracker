import { Subject } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
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
export class MedicalTransactionFormComponent implements OnInit, OnDestroy {
  @Input() public selectedAnimalId: number;
  @Input() public medicalTransaction: MedicalTransaction = {
    animalID: this.selectedAnimalId,
    dose: null,
    id: 0,
    medicineId: null,
    transactionDate: new Date(),
    unitId: null,
  };
  @Input() public medicineTypes: MedicineType[];
  @Input() public units: Unit[];

  @Output() public save = new EventEmitter<MedicalTransaction>();

  public medicalTransactionForm: FormGroup;
  public medicineTypeControl: FormControl;
  public transactionDateControl: FormControl;
  public doseControl: FormControl;
  public unitControl: FormControl;

  private destroyed$ = new Subject<void>();

  public ngOnInit(): void {
    this.initForm();
  }

  public onSave(): void {
    if (this.medicalTransactionForm.valid) {
      this.save.next(this.medicalTransactionForm.value);
    }
  }

  private initForm(): void {
    this.medicalTransactionForm = new FormGroup({
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
