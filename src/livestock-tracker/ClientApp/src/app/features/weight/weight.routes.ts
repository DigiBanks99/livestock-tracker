import { Routes } from '@angular/router';

export const WEIGHT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/weight-transaction-list.component').then(
        (m) => m.WeightTransactionListComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/weight-transaction-form.component').then(
        (m) => m.WeightTransactionFormComponent
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./components/weight-transaction-form.component').then(
        (m) => m.WeightTransactionFormComponent
      ),
  },
];
