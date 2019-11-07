import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MedicineTypeService } from '@medical/medicine-type/medicine-type.service';
import { MedicalTransaction } from '@medical/medical-transaction.model';
import { MedicalService } from '@medical/medical.service';
import { MedicineType } from '@medical/medicine-type.model';
import { Unit } from '@unit/unit.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-medical-transaction',
  templateUrl: './medical-transaction.component.html',
  styleUrls: ['./medical-transaction.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.medium }
  ]
})
export class MedicalTransactionComponent implements OnInit, OnDestroy {
  @Input() public medicalTransaction: MedicalTransaction;
  @Input() public units: Unit[];

  public medicalTransactionForm: FormGroup;
  public medicineTypes: MedicineType[];
  public medicineTypeControl: FormControl;
  public transactionDateControl: FormControl;
  public doseControl: FormControl;
  public unitControl: FormControl;

  private medicineTypeControlChanged: Subscription;
  private transactionDateControlChanged: Subscription;
  private doseControlChanged: Subscription;
  private unitControlChanged: Subscription;
  private medicineTypeChanged: Subscription;

  constructor(
    private medicalService: MedicalService,
    private medicineTypeService: MedicineTypeService
  ) {
    this.medicineTypes = [];

    this.medicineTypeControlChanged = new Subscription();
    this.transactionDateControlChanged = new Subscription();
    this.doseControlChanged = new Subscription();
    this.unitControlChanged = new Subscription();
    this.medicineTypeChanged = new Subscription();
  }

  ngOnInit() {
    this.initForm();

    this.medicineTypeChanged = this.medicineTypeService.medicineTypesChanged.subscribe(
      (medicineTypes: MedicineType[]) => (this.medicineTypes = medicineTypes)
    );
    this.medicineTypeService.getMedicineTypes();
  }

  public deleteTransaction(id: number) {
    this.medicalService.deleteMedicalTransaction(id);
  }

  private medicineTypeControlChangedHandler(value: number) {
    this.medicalTransaction.medicineTypeCode = value;
    this.updateMedicalTransaction();
  }

  private transactionDateControlChangedHandler(value: Date) {
    this.medicalTransaction.transactionDate = value;
    this.updateMedicalTransaction();
  }

  private doseControlChangedHandler(value: number) {
    this.medicalTransaction.dose = value;
    this.updateMedicalTransaction();
  }

  private unitControlChangedHandler(value: number) {
    this.medicalTransaction.unit = value;
    this.updateMedicalTransaction();
  }

  private updateMedicalTransaction() {
    this.medicalService.updateMedicalTransaction(this.medicalTransaction);
  }

  private initForm() {
    this.medicineTypeControl = new FormControl(
      this.medicalTransaction.medicineTypeCode,
      [Validators.required]
    );
    this.transactionDateControl = new FormControl(
      this.medicalTransaction.transactionDate,
      [Validators.required]
    );
    this.doseControl = new FormControl(this.medicalTransaction.dose, [
      Validators.required
    ]);
    this.unitControl = new FormControl(this.medicalTransaction.unit, [
      Validators.required
    ]);

    this.medicineTypeControlChanged = this.medicineTypeControl.valueChanges.subscribe(
      (value: number) => this.medicineTypeControlChangedHandler(value)
    );
    this.transactionDateControlChanged = this.transactionDateControl.valueChanges.subscribe(
      (value: Date) => this.transactionDateControlChangedHandler(value)
    );
    this.doseControlChanged = this.doseControl.valueChanges.subscribe(
      (value: number) => this.doseControlChangedHandler(value)
    );
    this.unitControlChanged = this.unitControl.valueChanges.subscribe(
      (value: number) => this.unitControlChangedHandler(value)
    );

    this.medicalTransactionForm = new FormGroup({
      medicineTypeCode: this.medicineTypeControl,
      transactionDate: this.transactionDateControl,
      dose: this.doseControl,
      unit: this.unitControl
    });
  }

  ngOnDestroy() {
    this.medicineTypeControlChanged.unsubscribe();
    this.transactionDateControlChanged.unsubscribe();
    this.doseControlChanged.unsubscribe();
    this.unitControlChanged.unsubscribe();
    this.medicineTypeChanged.unsubscribe();
  }
}
