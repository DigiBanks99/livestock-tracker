import { Routes } from '@angular/router';

export const UNIT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/unit-list.component').then(
        (m) => m.UnitListComponent
      ),
  },
];
