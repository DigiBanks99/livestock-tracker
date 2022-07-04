import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MedicalTransactionService,
  MedicineTypeService
} from '@medical/services';
import {
  medicalTransactionEffects,
  medicalTransactionReducer,
  medicineTypeEffects,
  medicineTypeReducer
} from '@medical/store';
import { MedicalStoreConstants } from '@medical/store/constants';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    EffectsModule.forFeature([
      medicineTypeEffects.MedicineTypeEffects,
      medicalTransactionEffects.MedicalTransactionEffects
    ]),
    MatSnackBarModule,
    StoreModule.forFeature(
      MedicalStoreConstants.MedicalTransactionStoreKey,
      medicalTransactionReducer.medicalTransactionReducer
    ),
    StoreModule.forFeature(
      MedicalStoreConstants.MedicineTypeStoreKey,
      medicineTypeReducer.medicineTypeReducer
    )
  ],
  providers: [MedicineTypeService, MedicalTransactionService]
})
export class MedicineStoreModule {}
