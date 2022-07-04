import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  MedicineTypeContainerComponent,
  MedicineTypeContainerComponentModule
} from './components/medicine-type/medicine-type.container';
import {
  MedicalTransactionDetailComponent,
  MedicalTransactionDetailComponentModule
} from './pages/medical-transaction-detail/medical-transaction-detail.component';
import {
  MedicalTransactionNewPage,
  MedicalTransactionNewPageModule
} from './pages/medical-transaction-new/medical-transaction-new.page';
import {
  MedicalTransactionPage,
  MedicalTransactionPageModule
} from './pages/medical-transactions/medical-transaction.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '1'
  },
  {
    path: 'type',
    pathMatch: 'full',
    component: MedicineTypeContainerComponent
  },
  {
    path: ':animalId',
    pathMatch: 'full',
    component: MedicalTransactionPage
  },
  {
    path: ':animalId/new',
    pathMatch: 'full',
    component: MedicalTransactionNewPage
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
    MedicalTransactionPageModule,
    MedicalTransactionNewPageModule,
    MedicalTransactionDetailComponentModule
  ],
  exports: [RouterModule]
})
export class MedicalRoutingModule {}
