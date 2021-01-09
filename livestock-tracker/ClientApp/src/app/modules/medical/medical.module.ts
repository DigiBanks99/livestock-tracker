import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { RouterModule } from '@angular/router';
import { MedicalTransactionFormComponent } from '@medical/components/medical-transaction-form/medical-transaction-form.component';
import { MedicalTransactionComponent } from '@medical/components/medical-transaction/medical-transaction.component';
import { MedicalTransactionContainerComponent } from '@medical/components/medical-transaction/medical-transaction.container';
import { MedicineTypeDetailComponent } from '@medical/components/medicine-type-detail/medicine-type-detail.component';
import { MedicineTypeComponent } from '@medical/components/medicine-type/medicine-type.component';
import { MedicalTransactionService } from '@medical/services';
import { MedicineTypeService } from '@medical/services/medicine-type.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { MedicalTransactionDetailComponent } from './components/medical-transaction-detail/medical-transaction-detail.component';
import { MedicalTransactionNewComponent } from './components/medical-transaction-new/medical-transaction-new.component';
import { MedicineTypeContainerComponent } from './components/medicine-type/medicine-type.container';
import { MedicalRoutingModule } from './medical-routing.module';
import {
  medicalTransactionEffects,
  medicalTransactionReducer,
  medicineTypeEffects,
  medicineTypeReducer,
} from './store';
import { MedicalStoreConstants } from './store/constants';

@NgModule({
  declarations: [
    MedicalTransactionContainerComponent,
    MedicalTransactionComponent,
    MedicalTransactionFormComponent,
    MedicineTypeContainerComponent,
    MedicineTypeComponent,
    MedicineTypeDetailComponent,
    MedicalTransactionDetailComponent,
    MedicalTransactionNewComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      medicineTypeEffects.MedicineTypeEffects,
      medicalTransactionEffects.MedicalTransactionEffects,
    ]),
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMomentDateModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MedicalRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature(
      MedicalStoreConstants.MedicalTransactionStoreKey,
      medicalTransactionReducer.medicalTransactionReducer
    ),
    StoreModule.forFeature(
      MedicalStoreConstants.MedicineTypeStoreKey,
      medicineTypeReducer.medicineTypeReducer
    ),
  ],
  providers: [MedicalTransactionService, MedicineTypeService],
  exports: [
    MedicineTypeContainerComponent,
    MedicalTransactionContainerComponent,
  ],
})
export class MedicalModule {}
