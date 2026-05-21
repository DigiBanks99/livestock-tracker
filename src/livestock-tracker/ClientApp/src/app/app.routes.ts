import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/components/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'animal',
    loadChildren: () =>
      import('./features/animal/animal.routes').then((m) => m.ANIMAL_ROUTES),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./features/feed/feed.routes').then((m) => m.FEED_ROUTES),
  },
  {
    path: 'medicine',
    loadChildren: () =>
      import('./features/medical/medical.routes').then((m) => m.MEDICAL_ROUTES),
  },
  {
    path: 'weight',
    loadChildren: () =>
      import('./features/weight/weight.routes').then((m) => m.WEIGHT_ROUTES),
  },
  {
    path: 'unit',
    loadChildren: () =>
      import('./features/unit/unit.routes').then((m) => m.UNIT_ROUTES),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./features/reports/components/reports.component').then(
        (m) => m.ReportsComponent
      ),
  },
];