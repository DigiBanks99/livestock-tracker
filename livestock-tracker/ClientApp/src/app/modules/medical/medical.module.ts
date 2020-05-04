import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MedicalTransactionComponent } from '@medical/components/medical-transaction/medical-transaction.component';
import { MedicalTransactionContainerComponent } from '@medical/components/medical-transaction/medical-transaction.container';
import { MedicalComponent } from '@medical/components/medical/medical.component';
import { MedicalContainerComponent } from '@medical/components/medical/medical.container';
import { MedicineTypeDetailComponent } from '@medical/components/medicine-type-detail/medicine-type-detail.component';
import { MedicineTypeComponent } from '@medical/components/medicine-type/medicine-type.component';
import { MedicalTransactionService } from '@medical/services/medical-transaction.service';
import { MedicineTypeService } from '@medical/services/medicine-type.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

import { MedicineTypeContainerComponent } from './components/medicine-type/medicine-type.container';
import { medicineTypeEffects, medicineTypeReducer } from './store';
import { MedicalStoreConstants } from './store/constants';

@NgModule({
  declarations: [
    MedicalTransactionContainerComponent,
    MedicalContainerComponent,
    MedicalComponent,
    MedicalTransactionComponent,
    MedicineTypeContainerComponent,
    MedicineTypeComponent,
    MedicineTypeDetailComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([medicineTypeEffects.MedicineTypeEffects]),
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatListModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(
      MedicalStoreConstants.MedicineTypeStoreKey,
      medicineTypeReducer.medicineTypeReducer
    ),
  ],
  providers: [MedicalTransactionService, MedicineTypeService],
  exports: [
    MedicalTransactionContainerComponent,
    MedicineTypeContainerComponent,
    MedicalContainerComponent,
  ],
})
export class MedicalModule {}
