import {
  Observable,
  Subject
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  OnDestroy,
  OnInit
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MedicineType } from '@core/models';
import { MedicineTypeState } from '@core/store/medicine-type-state.interface';
import { MedicineTypeComponentModule } from '@medical/components/medicine-type/medicine-type.component';
import { MedicineStore } from '@medical/store';
import { MedicineStoreModule } from '@medical/store/medicine-store.module';
import { FetchMedicineTypesAction } from '@medical/store/medicine-type.actions';
import {
  select,
  Store
} from '@ngrx/store';

@Component({
  selector: 'app-medicine-type-container',
  template: `
    <app-medicine-type
      [medicineTypes]="medicineTypes$ | async"
      [pageNumber]="pageNumber$ | async"
      [pageSize]="pageSize$ | async"
      [recordCount]="recordCount$ | async"
      (add)="onAdd($event)"
      (page)="onPage($event)"
      (remove)="onRemove($event)"
      (save)="onSave($event)"
    ></app-medicine-type>
  `
})
export class MedicineTypeContainerComponent implements OnDestroy, OnInit {
  public medicineTypes$: Observable<MedicineType[]>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
  public pageNumber$: Observable<number>;
  public pageSize$: Observable<number>;
  public recordCount$: Observable<number>;

  private destroyed$ = new Subject<void>();

  constructor(private store: Store<MedicineTypeState>) {
    this.medicineTypes$ = this.store.pipe(
      select(MedicineStore.Medicine.selectors.medicineTypes),
      takeUntil(this.destroyed$)
    );
    this.isPending$ = this.store.pipe(
      select(MedicineStore.Medicine.selectors.isPending),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(MedicineStore.Medicine.selectors.error),
      takeUntil(this.destroyed$)
    );

    this.pageNumber$ = this.store.pipe(
      select(MedicineStore.Medicine.selectors.currentPage),
      takeUntil(this.destroyed$)
    );
    this.pageSize$ = this.store.pipe(
      select(MedicineStore.Medicine.selectors.pageSize),
      takeUntil(this.destroyed$)
    );
    this.recordCount$ = this.store.pipe(
      select(MedicineStore.Medicine.selectors.recordCount),
      takeUntil(this.destroyed$)
    );
  }

  public ngOnInit(): void {
    this.store.dispatch(new FetchMedicineTypesAction());
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onAdd(medicineType: MedicineType): void {
    this.store.dispatch(MedicineStore.Medicine.actions.addItem(medicineType));
  }

  public onPage(pageEvent: PageEvent): void {
    this.store.dispatch(
      new FetchMedicineTypesAction(pageEvent.pageIndex, pageEvent.pageSize)
    );
  }

  public onRemove(id: number): void {
    this.store.dispatch(MedicineStore.Medicine.actions.deleteItem(id));
  }

  public onSave(medicineType: MedicineType): void {
    this.store.dispatch(
      MedicineStore.Medicine.actions.updateItem(medicineType, medicineType.id)
    );
  }
}

@NgModule({
  declarations: [MedicineTypeContainerComponent],
  exports: [MedicineTypeContainerComponent],
  imports: [CommonModule, MedicineTypeComponentModule, MedicineStoreModule]
})
export class MedicineTypeContainerComponentModule {}
