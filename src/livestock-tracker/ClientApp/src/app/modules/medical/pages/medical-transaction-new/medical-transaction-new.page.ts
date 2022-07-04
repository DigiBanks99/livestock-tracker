import {
  Observable,
  Subject
} from 'rxjs';
import {
  map,
  takeUntil
} from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  OnDestroy
} from '@angular/core';
import {
  Router,
  RouterModule
} from '@angular/router';
import {
  MedicalTransaction,
  MedicineType,
  SaveState,
  Unit
} from '@core/models';
import { AppState } from '@core/store';
import {
  getSelectedAnimalId,
  getUnits
} from '@core/store/selectors';
import { MedicalTransactionFormComponentModule } from '@medical/components/medical-transaction-form/medical-transaction-form.component';
import { MedicineStore } from '@medical/store';
import { MedicineStoreModule } from '@medical/store/medicine-store.module';
import {
  select,
  Store
} from '@ngrx/store';

@Component({
  template: `<h1>New medical transaction</h1>
    <app-medical-transaction-form
      [animalId]="animalId$ | async"
      [medicineTypes]="medicineTypes$ | async"
      [units]="units$ | async"
      (save)="onSave($event)"
    ></app-medical-transaction-form>`
})
export class MedicalTransactionNewPage implements OnDestroy {
  public readonly animalId$: Observable<number>;
  public readonly isFetching$: Observable<boolean>;
  public readonly isSaving$: Observable<boolean>;
  public readonly medicineTypes$: Observable<MedicineType[]>;
  public readonly units$: Observable<Unit[]>;

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _router: Router
  ) {
    this.animalId$ = this.setupAnimalId();
    this.isFetching$ = this.setupIsFetching();
    this.isSaving$ = this.setupIsSaving();
    this.medicineTypes$ = this.setupMedicineTypes();
    this.units$ = this.setupUnits();
  }

  public onSave(transaction: MedicalTransaction): Promise<boolean> {
    this._store.dispatch(
      MedicineStore.Transactions.actions.addItem(transaction)
    );
    return this._router.navigate(['medicine']);
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onNavigateBack(): Promise<boolean> {
    return this._router.navigate(['..']);
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

  private setupIsSaving(): Observable<boolean> {
    return this._store.pipe(
      select(MedicineStore.Transactions.selectors.saveState),
      map((saveState: SaveState) => saveState === SaveState.Saving),
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
  declarations: [MedicalTransactionNewPage],
  exports: [MedicalTransactionNewPage],
  imports: [
    CommonModule,
    MedicineStoreModule,
    RouterModule,
    MedicalTransactionFormComponentModule
  ]
})
export class MedicalTransactionNewPageModule {}
