import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MedicalTransaction, MedicineType, Unit } from '@core/models';
import { AppState } from '@core/store';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import {
  medicalTransactionActions,
  medicalTransactionStore,
  medicineTypeStore
} from '@medical/store';
import { FetchSingleMedicalTransaction } from '@medical/store/medical-transaction.actions';
import { FetchMedicineTypes } from '@medical/store/medicine-type.actions';
import { select, Store } from '@ngrx/store';

@Component({
  templateUrl: './medical-transaction-detail.component.html',
  styleUrls: ['./medical-transaction-detail.component.scss'],
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
          new FetchSingleMedicalTransaction(params.animalId, params.id)
        );
      });
    this.store.dispatch(new FetchMedicineTypes(0, 100, false));

    this.selectedMedicalTransaction$ = this.store.pipe(
      select(medicalTransactionStore.selectors.getSelectedMedicalTransaction),
      takeUntil(this.destroyed$)
    );
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

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onSave(medicalTransaction: MedicalTransaction): void {
    this.store.dispatch(
      medicalTransactionActions.actions.updateItem(
        medicalTransaction,
        medicalTransaction.id
      )
    );
    this.router.navigate(['medical']);
  }
}
