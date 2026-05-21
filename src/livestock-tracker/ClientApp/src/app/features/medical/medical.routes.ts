import { Routes } from '@angular/router';

export const MEDICAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/medical-transaction-list.component').then(
        (m) => m.MedicalTransactionListComponent
      ),
  },
  {
    path: 'types',
    loadComponent: () =>
      import('./components/medicine-type-list.component').then(
        (m) => m.MedicineTypeListComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/medical-transaction-form.component').then(
        (m) => m.MedicalTransactionFormComponent
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./components/medical-transaction-form.component').then(
        (m) => m.MedicalTransactionFormComponent
      ),
  },
];
