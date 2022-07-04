import { NgModule } from '@angular/core';
import { MedicalTransactionService } from '@medical/services';
import { MedicineTypeService } from '@medical/services/medicine-type.service';

import { MedicalRoutingModule } from './medical-routing.module';

@NgModule({
  imports: [MedicalRoutingModule],
  providers: [MedicalTransactionService, MedicineTypeService]
})
export class MedicalModule {}
