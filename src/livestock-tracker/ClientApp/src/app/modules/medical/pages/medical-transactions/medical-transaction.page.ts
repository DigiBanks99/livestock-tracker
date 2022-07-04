import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, NgModule, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { MedicalTransaction, MedicineType, Unit } from '@core/models';
import { AppState } from '@core/store';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { environment } from '@env/environment';
import { MedicalTransactionComponentModule } from '@medical/components/medical-transaction/medical-transaction.component';
import { MedicineStore } from '@medical/store';
import { MedicineStoreModule } from '@medical/store/medicine-store.module';
import { select, Store } from '@ngrx/store';

@Component({
  template: `
    <app-medical-transaction
      [transactions]="transactions$ | async"
      [medicineTypes]="medicineTypes$ | async"
      [units]="units$ | async"
      [pageNumber]="pageNumber$ | async"
      [pageSize]="pageSize$ | async"
      [recordCount]="recordCount$ | async"
      (addTransaction)="onAddTransaction()"
      (pageChanged)="onPageChanged($event)"
      (deleteTransaction)="onDeleteTransaction($event)"
    ></app-medical-transaction>
  `
})
export class MedicalTransactionPage implements OnDestroy {
  public readonly isLoadingTransactions$: Observable<boolean>;
  public readonly transactions$: Observable<MedicalTransaction[]>;
  public readonly medicineTypes$: Observable<MedicineType[]>;
  public readonly units$: Observable<Unit[]>;
  public readonly pageNumber$: Observable<number>;
  public readonly pageSize$: Observable<number>;
  public readonly recordCount$: Observable<number>;

  private _animalId: number | null = null;
  private readonly _destroyed$ = new Subject<void>();
  private readonly _pageChanged$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    length: 0,
    pageSize: environment.pageSize
  });

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _router: Router
  ) {
    this.transactions$ = this.setupTransactions();
    this.medicineTypes$ = this.setupMedicineTypes();
    this.units$ = this.setupUnits();
    this.isLoadingTransactions$ = this.setupLoaderStates();

    this.pageNumber$ = this.setupPageNumber();
    this.pageSize$ = this.setupPageSize();
    this.recordCount$ = this.setupRecordCount();

    this.setupTransactionFetch();
    this.setupAnimalId();
  }

  public ngOnDestroy(): void {
    this._pageChanged$.complete();

    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onAddTransaction(): Promise<boolean> {
    return this._router.navigate(['medicine', this._animalId, 'new']);
  }

  public onDeleteTransaction(id: number): void {
    this._store.dispatch(MedicineStore.Transactions.actions.deleteItem(id));
  }

  public onPageChanged(pageEvent: PageEvent): void {
    this._pageChanged$.next(pageEvent);
  }

  private setupLoaderStates(): Observable<boolean> {
    return this._store.pipe(
      select(MedicineStore.Transactions.selectors.isFetching),
      takeUntil(this._destroyed$)
    );
  }

  private setupAnimalId(): void {
    this._store
      .pipe(select(getSelectedAnimalId), takeUntil(this._destroyed$))
      .subscribe((animalId: number) => (this._animalId = animalId));
  }

  private setupTransactionFetch(): void {
    this._pageChanged$
      .asObservable()
      .pipe(takeUntil(this._destroyed$))
      .subscribe((pageEvent: PageEvent) => {
        this._store.dispatch(
          MedicineStore.Transactions.actions.fetchAnimalTransactions(
            pageEvent.pageIndex,
            pageEvent.pageSize
          )
        );
      });
  }

  private setupTransactions(): Observable<MedicalTransaction[]> {
    return this._store.pipe(
      select(MedicineStore.Transactions.selectors.medicalTransactionsForAnimal),
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

  private setupRecordCount(): Observable<number> {
    return this._store.pipe(
      select(MedicineStore.Transactions.selectors.recordCount),
      takeUntil(this._destroyed$)
    );
  }

  private setupPageSize(): Observable<number> {
    return this._store.pipe(
      select(MedicineStore.Transactions.selectors.pageSize),
      takeUntil(this._destroyed$)
    );
  }

  private setupPageNumber(): Observable<number> {
    return this._store.pipe(
      select(MedicineStore.Transactions.selectors.currentPage),
      takeUntil(this._destroyed$)
    );
  }
}

@NgModule({
  declarations: [MedicalTransactionPage],
  exports: [MedicalTransactionPage],
  imports: [
    CommonModule,
    MedicalTransactionComponentModule,
    MedicineStoreModule,
    RouterModule
  ]
})
export class MedicalTransactionPageModule {}
