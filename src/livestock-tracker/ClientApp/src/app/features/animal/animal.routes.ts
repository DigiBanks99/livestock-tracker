import { Routes } from '@angular/router';

export const ANIMAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/animal-list-page.component').then(
        (m) => m.AnimalListPageComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/animal-form-page.component').then(
        (m) => m.AnimalFormPageComponent
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./components/animal-form-page.component').then(
        (m) => m.AnimalFormPageComponent
      ),
  },
];
