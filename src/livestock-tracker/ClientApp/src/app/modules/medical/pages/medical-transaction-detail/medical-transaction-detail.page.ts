import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, NgModule, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MedicalTransaction, MedicineType, Unit } from '@core/models';
import { AppState } from '@core/store';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { MedicalTransactionFormComponentModule } from '@medical/components';
import { MedicineStore } from '@medical/store';
import { MedicineStoreModule } from '@medical/store/medicine-store.module';
import { select, Store } from '@ngrx/store';

@Component({
  template: `<h1>Edit medical transaction</h1>
    <app-medical-transaction-form
      backLink="../.."
      [animalId]="selectedAnimalId$ | async"
      [isLoading]="isFetching$ | async"
      [medicineTypes]="medicineTypes$ | async"
      [transaction]="transaction$ | async"
      [units]="units$ | async"
      (save)="onSave($event)"
    >
    </app-medical-transaction-form>`
})
export class MedicalTransactionDetailPage implements OnDestroy {
  public readonly transaction$: Observable<MedicalTransaction>;
  public readonly selectedAnimalId$: Observable<number>;
  public readonly isFetching$: Observable<boolean>;
  public readonly medicineTypes$: Observable<MedicineType[]>;
  public readonly units$: Observable<Unit[]>;

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _router: Router
  ) {
    this.transaction$ = this.setupTransaction();
    this.selectedAnimalId$ = this.setupAnimalId();
    this.isFetching$ = this.setupIsFetching();
    this.medicineTypes$ = this.setupMedicineTypes();
    this.units$ = this.setupUnits();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onSave(medicalTransaction: MedicalTransaction): Promise<boolean> {
    this._store.dispatch(
      MedicineStore.Transactions.actions.updateItem(
        medicalTransaction,
        medicalTransaction.id
      )
    );
    return this._router.navigate(['medicine', medicalTransaction.animalId]);
  }

  private setupTransaction(): Observable<MedicalTransaction> {
    return this._store.pipe(
      select(MedicineStore.Transactions.selectors.selectedMedicalTransaction),
      takeUntil(this._destroyed$)
    );
  }

  private setupAnimalId(): Observable<number> {
    return this._store.pipe(
      select(getSelectedAnimalId),
      takeUntil(this._destroyed$)
    );
  }

  private setupIsFetching(): Observable<boolean> {
    return this._store.pipe(
      select(MedicineStore.Transactions.selectors.isFetching),
      takeUntil(this._destroyed$)
    );
  }

  private setupMedicineTypes(): Observable<MedicineType[]> {
    return this._store.pipe(
      select(MedicineStore.Medicine.selectors.medicineTypes),
      takeUntil(this._destroyed$)
    );
  }

  private setupUnits(): Observable<Unit[]> {
    return this._store.pipe(select(getUnits), takeUntil(this._destroyed$));
  }
}

@NgModule({
  declarations: [MedicalTransactionDetailPage],
  exports: [MedicalTransactionDetailPage],
  imports: [
    CommonModule,
    MedicineStoreModule,
    RouterModule,
    MedicalTransactionFormComponentModule
  ]
})
export class MedicalTransactionDetailComponentModule {}
