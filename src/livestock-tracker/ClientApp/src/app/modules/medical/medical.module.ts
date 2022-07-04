import { NgModule } from '@angular/core';
import { MedicalTransactionService } from '@medical/services';
import { MedicineTypeService } from '@medical/services/medicine-type.service';
import { MedicineStore } from '@medical/store';
import { Store } from '@ngrx/store';

import { MedicalRoutingModule } from './medical-routing.module';

@NgModule({
  imports: [MedicalRoutingModule],
  providers: [MedicalTransactionService, MedicineTypeService]
})
export class MedicalModule {
  constructor(store: Store) {
    store.dispatch(MedicineStore.Medicine.actions.fetchItems());
  }
}
