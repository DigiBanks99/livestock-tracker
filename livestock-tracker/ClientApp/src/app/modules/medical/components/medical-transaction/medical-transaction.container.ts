import { combineLatest, EMPTY, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Animal } from '@app/core/models/livestock.model';
import { MedicalTransaction, MedicineType, Unit } from '@core/models';
import { AppState } from '@core/store';
import { getSelectedAnimal, getUnits } from '@core/store/selectors';
import { environment } from '@env/environment';
import {
  medicalTransactionActions,
  medicalTransactionStore,
  medicineTypeStore
} from '@medical/store';
import { FetchMedicalTransactionsAction } from '@medical/store/medical-transaction.actions';
import { FetchMedicineTypesAction } from '@medical/store/medicine-type.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-medical-container',
  template: `
    <app-medical-transaction
      [currentAnimal]="selectedAnimal$ | async"
      [medicalTransactions]="medicalTransactions$ | async"
      [medicineTypes]="medicineTypes$ | async"
      [units]="units$ | async"
      [pageNumber]="pageNumber$ | async"
      [pageSize]="pageSize$ | async"
      [recordCount]="recordCount$ | async"
      (add)="onAdd($event)"
      (page)="onPage($event)"
      (remove)="onRemove($event)"
    ></app-medical-transaction>
  `
})
export class MedicalTransactionContainerComponent implements OnDestroy {
  public selectedAnimal$: Observable<Animal> = EMPTY;
  public medicalTransactions$: Observable<MedicalTransaction[]> = EMPTY;
  public medicineTypes$: Observable<MedicineType[]> = EMPTY;
  public units$: Observable<Unit[]> = EMPTY;
  public pageNumber$: Observable<number> = EMPTY;
  public pageSize$: Observable<number> = EMPTY;
  public recordCount$: Observable<number> = EMPTY;

  private destroyed$ = new Subject<void>();
  private page$ = new Subject<PageEvent>();

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new FetchMedicineTypesAction());
    this.selectedAnimal$ = this.store.pipe(
      select(getSelectedAnimal),
      filter((animal: Animal) => {
        console.log(`MT: ${JSON.stringify(animal)}`);
        return animal != null;
      }),
      tap((animal: Animal) => {
        this.store.dispatch(
          new FetchMedicalTransactionsAction(animal.id, 0, environment.pageSize)
        );
      }),
      takeUntil(this.destroyed$)
    );
    this.medicalTransactions$ = this.store.pipe(
      select(medicalTransactionStore.selectors.getMedicalTransactions),
      takeUntil(this.destroyed$)
    );
    this.medicineTypes$ = this.store.pipe(
      select(medicineTypeStore.selectors.getMedicineTypes),
      takeUntil(this.destroyed$)
    );
    this.units$ = this.store.pipe(select(getUnits), takeUntil(this.destroyed$));

    this.pageNumber$ = this.store.pipe(
      select(medicalTransactionStore.selectors.getCurrentPage),
      takeUntil(this.destroyed$)
    );
    this.pageSize$ = this.store.pipe(
      select(medicalTransactionStore.selectors.getPageSize),
      takeUntil(this.destroyed$)
    );
    this.recordCount$ = this.store.pipe(
      select(medicalTransactionStore.selectors.getRecordCount),
      takeUntil(this.destroyed$)
    );

    combineLatest([this.selectedAnimal$, this.page$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([animal, pageEvent]: [Animal, PageEvent]) => {
        console.log(animal, pageEvent);
        this.store.dispatch(
          new FetchMedicalTransactionsAction(
            animal.id,
            pageEvent.pageIndex,
            pageEvent.pageSize
          )
        );
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onAdd(medicalTransaction: MedicalTransaction): void {
    this.store.dispatch(
      medicalTransactionActions.actions.addItem(medicalTransaction)
    );
  }

  public onRemove(id: number): void {
    this.store.dispatch(medicalTransactionActions.actions.deleteItem(id));
  }

  public onPage(pageEvent: PageEvent): void {
    this.page$.next(pageEvent);
  }
}
