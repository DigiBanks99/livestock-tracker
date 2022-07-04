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
import {
  Router,
  RouterModule
} from '@angular/router';
import {
  MedicalTransaction,
  MedicineType,
  Unit
} from '@core/models';
import { AppState } from '@core/store';
import {
  getSelectedAnimalId,
  getUnits
} from '@core/store/selectors';
import { MedicalTransactionFormComponentModule } from '@medical/components/medical-transaction-form/medical-transaction-form.component';
import {
  medicalTransactionStore,
  medicineTypeStore
} from '@medical/store';
import { actions } from '@medical/store/medical-transaction.actions';
import { MedicineStoreModule } from '@medical/store/medicine-store.module';
import { FetchMedicineTypesAction } from '@medical/store/medicine-type.actions';
import {
  select,
  Store
} from '@ngrx/store';

@Component({
  templateUrl: './medical-transaction-new.component.html'
})
export class MedicalTransactionNewComponent implements OnDestroy, OnInit {
  public selectedAnimalId$: Observable<number>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
  public medicineTypes$: Observable<MedicineType[]>;
  public units$: Observable<Unit[]>;

  private destroyed$ = new Subject<void>();

  constructor(private store: Store<AppState>, private router: Router) {}

  public ngOnInit(): void {
    this.store.dispatch(new FetchMedicineTypesAction());
    this.selectedAnimalId$ = this.store.pipe(
      select(getSelectedAnimalId),
      takeUntil(this.destroyed$)
    );
    this.isPending$ = this.store.pipe(
      select(medicalTransactionStore.selectors.getPending),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(medicalTransactionStore.selectors.getError),
      takeUntil(this.destroyed$)
    );
    this.medicineTypes$ = this.store.pipe(
      select(medicineTypeStore.selectors.getMedicineTypes),
      takeUntil(this.destroyed$)
    );
    this.units$ = this.store.pipe(select(getUnits), takeUntil(this.destroyed$));
  }

  public onSave(transaction: MedicalTransaction) {
    this.store.dispatch(actions.addItem(transaction));
    this.router.navigate(['medical']);
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

@NgModule({
  declarations: [MedicalTransactionNewComponent],
  exports: [MedicalTransactionNewComponent],
  imports: [
    CommonModule,
    MedicineStoreModule,
    RouterModule,
    MedicalTransactionFormComponentModule
  ]
})
export class MedicalTransactionNewComponentModule {}
