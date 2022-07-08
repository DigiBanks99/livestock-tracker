import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedingTransactionContainerComponent } from '@feed/components';
import { FeedTypeContainerComponent } from '@feed/components/feed-type/feed-type.container';
import { FeedingTransactionDetailComponent } from '@feed/components/feeding-transaction-detail/feeding-transaction-detail.component';
import { FeedingTransactionNewComponent } from '@feed/components/feeding-transaction-new/feeding-transaction-new.component';
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
  { path: 'feed-type', component: FeedTypeContainerComponent },
  {
    path: 'feeding-transaction',
    component: FeedingTransactionContainerComponent
  },
  {
    path: 'feeding-transaction/:animalId/new',
    component: FeedingTransactionNewComponent
  },
  {
    path: 'feeding-transaction/:animalId/:id/edit',
    component: FeedingTransactionDetailComponent
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
