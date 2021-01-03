import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MedicalTransactionDetailComponent } from './components/medical-transaction-detail/medical-transaction-detail.component';
import { MedicalTransactionNewComponent } from './components/medical-transaction-new/medical-transaction-new.component';
import { MedicalTransactionContainerComponent } from './components/medical-transaction/medical-transaction.container';
import { MedicineTypeContainerComponent } from './components/medicine-type/medicine-type.container';

const routes: Routes = [
  {
    path: '',
    component: MedicalTransactionContainerComponent,
  },
  {
    path: 'medicine-type',
    component: MedicineTypeContainerComponent,
  },
  {
    path: ':animalId/new',
    component: MedicalTransactionNewComponent,
  },
  {
    path: ':animalId/:id/edit',
    component: MedicalTransactionDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalRoutingModule {}
