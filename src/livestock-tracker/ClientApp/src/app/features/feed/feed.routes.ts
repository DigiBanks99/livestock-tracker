import { Routes } from '@angular/router';

export const FEED_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/feeding-transaction-list.component').then(
        (m) => m.FeedingTransactionListComponent
      ),
  },
  {
    path: 'types',
    loadComponent: () =>
      import('./components/feed-type-list.component').then(
        (m) => m.FeedTypeListComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/feeding-transaction-form.component').then(
        (m) => m.FeedingTransactionFormComponent
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./components/feeding-transaction-form.component').then(
        (m) => m.FeedingTransactionFormComponent
      ),
  },
];
