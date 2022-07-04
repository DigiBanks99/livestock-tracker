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
  ActivatedRoute,
  Params,
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
import { MedicineStore } from '@medical/store';
import { FetchSingleMedicalTransactionAction } from '@medical/store/medical-transaction.actions';
import { MedicineStoreModule } from '@medical/store/medicine-store.module';
import { FetchMedicineTypesAction } from '@medical/store/medicine-type.actions';
import {
  select,
  Store
} from '@ngrx/store';

@Component({
  templateUrl: './medical-transaction-detail.component.html'
})
export class MedicalTransactionDetailComponent implements OnDestroy, OnInit {
  public selectedMedicalTransaction$: Observable<MedicalTransaction>;
  public selectedAnimalId$: Observable<number>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
  public medicineTypes$: Observable<MedicineType[]>;
  public units$: Observable<Unit[]>;

  private destroyed$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params: Params) => {
        this.store.dispatch(
          new FetchSingleMedicalTransactionAction(params.animalId, params.id)
        );
      });
    this.store.dispatch(new FetchMedicineTypesAction(0, 100, false));

    this.selectedMedicalTransaction$ = this.store.pipe(
      select(MedicineStore.Transactions.selectors.selectedMedicalTransaction),
      takeUntil(this.destroyed$)
    );
    this.selectedAnimalId$ = this.store.pipe(
      select(getSelectedAnimalId),
      takeUntil(this.destroyed$)
    );
    this.isPending$ = this.store.pipe(
      select(MedicineStore.Transactions.selectors.isFetching),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(MedicineStore.Transactions.selectors.error),
      takeUntil(this.destroyed$)
    );
    this.medicineTypes$ = this.store.pipe(
      select(MedicineStore.Medicine.selectors.medicineTypes),
      takeUntil(this.destroyed$)
    );
    this.units$ = this.store.pipe(select(getUnits), takeUntil(this.destroyed$));
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onSave(medicalTransaction: MedicalTransaction): void {
    this.store.dispatch(
      MedicineStore.Transactions.actions.updateItem(
        medicalTransaction,
        medicalTransaction.id
      )
    );
    this.router.navigate(['medical']);
  }
}

@NgModule({
  declarations: [MedicalTransactionDetailComponent],
  exports: [MedicalTransactionDetailComponent],
  imports: [
    CommonModule,
    MedicineStoreModule,
    RouterModule,
    MedicalTransactionFormComponentModule
  ]
})
export class MedicalTransactionDetailComponentModule {}
