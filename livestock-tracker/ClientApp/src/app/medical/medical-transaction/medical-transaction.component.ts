import { UnitService } from './../../unit/unit.service';
import { Unit } from './../../unit/unit.model';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatSelect, MatSelectChange, MAT_DATE_FORMATS } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MedicalTransaction } from '../medical-transaction.model';
import { MedicalService } from '../medical.service';
import { MedicineType } from '../medicine-type.model';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
@Component({
  selector: 'app-medical-transaction',
  templateUrl: './medical-transaction.component.html',
  styleUrls: ['./medical-transaction.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class MedicalTransactionComponent implements OnInit, OnDestroy {
  @Input() medicalTransaction: MedicalTransaction;

  public medicalTransactionForm: FormGroup;
  public medicineTypes: MedicineType[];
  public medecineTypeControl: FormControl;
  public transactionDateControl: FormControl;
  public doseControl: FormControl;
  public unitControl: FormControl;
  public units: Unit[];

  private medecineTypeControlChanged: Subscription;
  private transactionDateControlChanged: Subscription;
  private doseControlChanged: Subscription;
  private unitControlChanged: Subscription;
  private unitsChanged: Subscription;

  constructor(private medicalService: MedicalService, private unitService: UnitService) {
    this.medicineTypes = [];
    const antibiotics = new MedicineType();
    antibiotics.typeCode = 1;
    antibiotics.description = 'Antibiotics';
    const painkiller = new MedicineType();
    painkiller.typeCode = 2;
    painkiller.description = 'Painkiller';
    this.medicineTypes.push(antibiotics);
    this.medicineTypes.push(painkiller);

    this.units = [];
  }

  ngOnInit() {
    this.initForm();

    this.unitsChanged = this.unitService.unitsChanged.subscribe((units: Unit[]) => this.units = units);
    this.unitService.getUnits();
  }

  public deleteTransaction(id: number) {
    this.medicalService.deleteMedicalTransaction(id);
  }

  private medecineTypeControlChangedHandler(value: number) {
    this.medicalTransaction.medecineTypeCode = value;
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
    this.medecineTypeControl = new FormControl(this.medicalTransaction.medecineTypeCode, [Validators.required]);
    this.transactionDateControl = new FormControl(this.medicalTransaction.transactionDate, [Validators.required]);
    this.doseControl = new FormControl(this.medicalTransaction.dose, [Validators.required]);
    this.unitControl = new FormControl(this.medicalTransaction.unit, [Validators.required]);

    this.medecineTypeControlChanged = this.medecineTypeControl.valueChanges.subscribe((value: number) => this.medecineTypeControlChangedHandler(value));
    this.transactionDateControlChanged = this.transactionDateControl.valueChanges.subscribe((value: Date) => this.transactionDateControlChangedHandler(value));
    this.doseControlChanged = this.doseControl.valueChanges.subscribe((value: number) => this.doseControlChangedHandler(value));
    this.unitControlChanged = this.unitControl.valueChanges.subscribe((value: number) => this.unitControlChangedHandler(value));

    this.medicalTransactionForm = new FormGroup({
      medecineTypeCode: this.medecineTypeControl,
      transactionDate: this.transactionDateControl,
      dose: this.doseControl,
      unit: this.unitControl
    });
  }

  ngOnDestroy() {
    this.medecineTypeControlChanged.unsubscribe();
    this.transactionDateControlChanged.unsubscribe();
    this.doseControlChanged.unsubscribe();
    this.unitControlChanged.unsubscribe();
    this.unitControlChanged.unsubscribe();
  }
}
