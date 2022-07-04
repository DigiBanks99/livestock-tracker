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
import {
  medicineTypeActions,
  medicineTypeStore
} from '@medical/store';
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
      select(medicineTypeStore.selectors.getMedicineTypes),
      takeUntil(this.destroyed$)
    );
    this.isPending$ = this.store.pipe(
      select(medicineTypeStore.selectors.getPending),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(medicineTypeStore.selectors.getError),
      takeUntil(this.destroyed$)
    );

    this.pageNumber$ = this.store.pipe(
      select(medicineTypeStore.selectors.getCurrentPage),
      takeUntil(this.destroyed$)
    );
    this.pageSize$ = this.store.pipe(
      select(medicineTypeStore.selectors.getPageSize),
      takeUntil(this.destroyed$)
    );
    this.recordCount$ = this.store.pipe(
      select(medicineTypeStore.selectors.getRecordCount),
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
    this.store.dispatch(medicineTypeActions.actions.addItem(medicineType));
  }

  public onPage(pageEvent: PageEvent): void {
    this.store.dispatch(
      new FetchMedicineTypesAction(pageEvent.pageIndex, pageEvent.pageSize)
    );
  }

  public onRemove(id: number): void {
    this.store.dispatch(medicineTypeActions.actions.deleteItem(id));
  }

  public onSave(medicineType: MedicineType): void {
    this.store.dispatch(
      medicineTypeActions.actions.updateItem(medicineType, medicineType.id)
    );
  }
}

@NgModule({
  declarations: [MedicineTypeContainerComponent],
  exports: [MedicineTypeContainerComponent],
  imports: [CommonModule, MedicineTypeComponentModule, MedicineStoreModule]
})
export class MedicineTypeContainerComponentModule {}
