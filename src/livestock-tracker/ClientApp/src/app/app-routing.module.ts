import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@home/components/home.component';
import { ReportsComponent } from '@reports/components/reports.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'reports', component: ReportsComponent },
  {
    path: 'feed',
    loadChildren: async () =>
      (await import('./modules/feed/feed.module')).FeedModule
  },
  {
    path: 'medicine',
    loadChildren: async () =>
      (await import('./modules/medical/medical.module')).MedicalModule
  },
  {
    path: 'weight',
    loadChildren: async () =>
      (await import('./modules/weight/weight.module')).WeightModule
  },
  {
    path: 'unit',
    loadChildren: async () =>
      (await import('./modules/unit/unit.module')).UnitModule
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
