import { NgModule } from '@angular/core';
import { MedicalTransactionContainerComponent } from './medical-transaction/medical-transaction-container.component';
import { MedicalTransactionComponent } from './medical-transaction/medical-transaction.component';
import { MedicalContainerComponent } from './medical-container.component';
import { MedicalComponent } from './medical.component';
import { MedicineTypeComponent } from './medicine-type/medicine-type.component';
import { MedicineTypeDetailComponent } from './medicine-type/medicine-type-detail/medicine-type-detail.component';
import { MedicalService } from './medical.service';
import { MedicineTypeService } from './medicine-type/medicine-type.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '@shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

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
