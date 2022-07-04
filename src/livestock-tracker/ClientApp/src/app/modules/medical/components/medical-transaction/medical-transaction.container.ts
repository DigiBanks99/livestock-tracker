import {
  EMPTY,
  Observable,
  Subject
} from 'rxjs';
import {
  filter,
  takeUntil
} from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  OnDestroy
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  Router,
  RouterModule
} from '@angular/router';
import {
  Animal,
  MedicalTransaction,
  MedicineType,
  Unit
} from '@core/models';
import { AppState } from '@core/store';
import {
  getSelectedAnimal,
  getUnits
} from '@core/store/selectors';
import { MedicalTransactionComponentModule } from '@medical/components/medical-transaction/medical-transaction.component';
import {
  medicalTransactionActions,
  medicalTransactionStore,
  medicineTypeStore
} from '@medical/store';
import { MedicineStoreModule } from '@medical/store/medicine-store.module';
import { FetchMedicineTypesAction } from '@medical/store/medicine-type.actions';
import {
  select,
  Store
} from '@ngrx/store';

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

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _router: Router
  ) {
    this._store.dispatch(new FetchMedicineTypesAction());
    this.selectedAnimal$ = this._store.pipe(
      select(getSelectedAnimal),
      filter((animal: Animal) => animal != null),
      takeUntil(this.destroyed$)
    );
    this.medicalTransactions$ = this._store.pipe(
      select(medicalTransactionStore.selectors.getMedicalTransactions),
      takeUntil(this.destroyed$)
    );
    this.medicineTypes$ = this._store.pipe(
      select(medicineTypeStore.selectors.getMedicineTypes),
      takeUntil(this.destroyed$)
    );
    this.units$ = this._store.pipe(
      select(getUnits),
      takeUntil(this.destroyed$)
    );

    this.pageNumber$ = this._store.pipe(
      select(medicalTransactionStore.selectors.getCurrentPage),
      takeUntil(this.destroyed$)
    );
    this.pageSize$ = this._store.pipe(
      select(medicalTransactionStore.selectors.getPageSize),
      takeUntil(this.destroyed$)
    );
    this.recordCount$ = this._store.pipe(
      select(medicalTransactionStore.selectors.getRecordCount),
      takeUntil(this.destroyed$)
    );
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onAdd(animalId: number): void {
    this._router.navigate(['medicine', animalId, 'new']);
  }

  public onRemove(id: number): void {
    this._store.dispatch(medicalTransactionActions.actions.deleteItem(id));
  }

  public onPage(pageEvent: PageEvent): void {
    this.page$.next(pageEvent);
  }
}

@NgModule({
  declarations: [MedicalTransactionContainerComponent],
  exports: [MedicalTransactionContainerComponent],
  imports: [
    CommonModule,
    MedicalTransactionComponentModule,
    MedicineStoreModule,
    RouterModule
  ]
})
export class MedicalTransactionContainerComponentModule {}
