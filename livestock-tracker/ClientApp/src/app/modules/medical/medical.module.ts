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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MedicalTransactionComponent } from '@medical/components/medical-transaction/medical-transaction.component';
import { MedicalTransactionContainerComponent } from '@medical/components/medical-transaction/medical-transaction.container';
import { MedicalComponent } from '@medical/components/medical/medical.component';
import { MedicalContainerComponent } from '@medical/components/medical/medical.container';
import { MedicineTypeDetailComponent } from '@medical/components/medicine-type-detail/medicine-type-detail.component';
import { MedicineTypeComponent } from '@medical/components/medicine-type/medicine-type.component';
import { MedicalService } from '@medical/services/medical.service';
import { MedicineTypeService } from '@medical/services/medicine-type.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    MedicalTransactionContainerComponent,
    MedicalContainerComponent,
    MedicalComponent,
    MedicalTransactionComponent,
    MedicineTypeComponent,
    MedicineTypeDetailComponent
  ],
  imports: [
    CommonModule,
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
    MatToolbarModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [MedicalService, MedicineTypeService],
  exports: [
    MedicalTransactionContainerComponent,
    MedicineTypeComponent,
    MedicalContainerComponent
  ]
})
export class MedicalModule {}
