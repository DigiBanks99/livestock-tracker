import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  MedicalTransactionDetailComponent,
  MedicalTransactionDetailComponentModule
} from './components/medical-transaction-detail/medical-transaction-detail.component';
import {
  MedicalTransactionNewComponent,
  MedicalTransactionNewComponentModule
} from './components/medical-transaction-new/medical-transaction-new.component';
import {
  MedicalTransactionContainerComponent,
  MedicalTransactionContainerComponentModule
} from './components/medical-transaction/medical-transaction.container';
import {
  MedicineTypeContainerComponent,
  MedicineTypeContainerComponentModule
} from './components/medicine-type/medicine-type.container';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MedicineTypeContainerComponent
  },
  {
    path: 'type',
    pathMatch: 'full',
    component: MedicineTypeContainerComponent
  },
  {
    path: ':animalId',
    pathMatch: 'full',
    component: MedicalTransactionContainerComponent
  },
  {
    path: ':animalId/new',
    pathMatch: 'full',
    component: MedicalTransactionNewComponent
  },
  {
    path: ':animalId/edit/:id',
    pathMatch: 'full',
    component: MedicalTransactionDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MedicineTypeContainerComponentModule,
    MedicalTransactionContainerComponentModule,
    MedicalTransactionNewComponentModule,
    MedicalTransactionDetailComponentModule
  ],
  exports: [RouterModule]
})
export class MedicalRoutingModule {}
