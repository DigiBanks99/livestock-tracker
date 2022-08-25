import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
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
    loadChildren: () =>
      import('./modules/medical/medical.module').then(
        (module) => module.MedicalModule
      )
  },
  {
    path: 'weight',
    loadChildren: () =>
      import('./modules/weight/weight.module').then((m) => m.WeightModule)
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
