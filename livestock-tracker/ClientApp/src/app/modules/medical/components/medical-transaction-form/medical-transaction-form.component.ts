import { EMPTY, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MedicalTransaction } from '@core/models/medical-transaction.model';
import { MedicineType } from '@core/models/medicine-type.model';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import { environment } from '@env/environment';
import { MedicalTransactionService } from '@medical/services/medical-transaction.service';
import { MedicineTypeService } from '@medical/services/medicine-type.service';
import { medicineTypeStore } from '@medical/store';
import { FetchMedicineTypes } from '@medical/store/medicine-type.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-medical-transaction-form',
  templateUrl: './medical-transaction-form.component.html',
  styleUrls: ['./medical-transaction-form.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.medium },
  ],
})
export class MedicalTransactionFormComponent implements OnInit, OnDestroy {
  @Input() public medicalTransaction: MedicalTransaction;
  @Input() public units: Unit[];

  public medicalTransactionForm: FormGroup;
  public medicineTypes$: Observable<MedicineType[]> = EMPTY;
  public medicineTypeControl: FormControl;
  public transactionDateControl: FormControl;
  public doseControl: FormControl;
  public unitControl: FormControl;

  private destroyed$ = new Subject<void>();
  private medicineTypeControlChanged: Subscription;
  private transactionDateControlChanged: Subscription;
  private doseControlChanged: Subscription;
  private unitControlChanged: Subscription;
  private medicineTypeChanged: Subscription;

  constructor(
    private store: Store<AppState>,
    private medicalService: MedicalTransactionService,
    private medicineTypeService: MedicineTypeService
  ) {
    this.medicineTypeControlChanged = new Subscription();
    this.transactionDateControlChanged = new Subscription();
    this.doseControlChanged = new Subscription();
    this.unitControlChanged = new Subscription();
    this.medicineTypeChanged = new Subscription();
  }

  public ngOnInit(): void {
    this.medicineTypes$ = this.store.pipe(
      select(medicineTypeStore.selectors.getMedicineTypes),
      takeUntil(this.destroyed$)
    );

    this.store.dispatch(new FetchMedicineTypes());

    this.initForm();
  }

  public deleteTransaction(id: number) {
    this.medicalService.delete(id);
  }

  private medicineTypeControlChangedHandler(value: number) {
    this.medicalTransaction.medicineId = value;
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
    this.medicalTransaction.unitId = value;
    this.updateMedicalTransaction();
  }

  private updateMedicalTransaction() {
    this.medicalService.update(this.medicalTransaction);
  }

  private initForm() {
    this.medicineTypeControl = new FormControl(
      this.medicalTransaction.medicineId,
      [Validators.required]
    );
    this.transactionDateControl = new FormControl(
      this.medicalTransaction.transactionDate,
      [Validators.required]
    );
    this.doseControl = new FormControl(this.medicalTransaction.dose, [
      Validators.required,
    ]);
    this.unitControl = new FormControl(this.medicalTransaction.unitId, [
      Validators.required,
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
      medicineTypeId: this.medicineTypeControl,
      transactionDate: this.transactionDateControl,
      dose: this.doseControl,
      unitId: this.unitControl,
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();

    this.medicineTypeControlChanged.unsubscribe();
    this.transactionDateControlChanged.unsubscribe();
    this.doseControlChanged.unsubscribe();
    this.unitControlChanged.unsubscribe();
    this.medicineTypeChanged.unsubscribe();
  }
}
