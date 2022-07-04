import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import {
  MedicalTransactionService,
  MedicineTypeService
} from '@medical/services';
import { MedicalStoreConstants } from '@medical/store/constants';
import { MedicalTransactionEffects } from '@medical/store/medical-transaction.effects';
import { medicalTransactionReducer } from '@medical/store/medical-transaction.reducer';
import { MedicineTypeEffects } from '@medical/store/medicine-type.effects';
import { medicineTypeReducer } from '@medical/store/medicine-type.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    EffectsModule.forFeature([MedicalTransactionEffects, MedicineTypeEffects]),
    MatSnackBarModule,
    RouterModule,
    StoreModule.forFeature(
      MedicalStoreConstants.Transactions.StoreKey,
      medicalTransactionReducer
    ),
    StoreModule.forFeature(
      MedicalStoreConstants.Medicine.StoreKey,
      medicineTypeReducer
    )
  ],
  providers: [MedicalTransactionService, MedicineTypeService]
})
export class MedicineStoreModule {}
