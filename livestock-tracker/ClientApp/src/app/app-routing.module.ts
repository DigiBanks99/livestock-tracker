import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from '@home/home.component';
import { LivestockComponent } from '@livestock/livestock.component';
import { LivestockDetailContainerComponent } from '@livestock/livestock-detail/livestock-detail-container.component';
import { LivestockNewComponent } from '@livestock/livestock-new/livestock-new.component';
import { ReportsComponent } from '@reports/reports.component';
import { MedicineTypeComponent } from '@medical/medicine-type/medicine-type.component';
import { UnitComponent } from '@unit/unit.component';
import { FeedTypeComponent } from '@feed-type/feed-type.component';
import { FeedingTransactionDetailComponent } from '@feeding-transaction/feeding-transaction-detail/feeding-transaction-detail.component';
import { MedicalContainerComponent } from '@medical/medical-container.component';
import { FeedingTransactionContainerComponent } from '@feeding-transaction/feeding-transaction-container.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'livestock',
    component: LivestockComponent,
    children: [
      { path: 'new', component: LivestockNewComponent },
      { path: ':id/edit', component: LivestockDetailContainerComponent }
    ]
  },
  { path: 'medical', component: MedicalContainerComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'units', component: UnitComponent },
  { path: 'medicine-type', component: MedicineTypeComponent },
  { path: 'feed-type', component: FeedTypeComponent },
  {
    path: 'feeding-transaction',
    component: FeedingTransactionContainerComponent,
    children: [
      { path: ':animalId/new', component: FeedingTransactionDetailComponent },
      {
        path: ':animalId/:id/edit',
        component: FeedingTransactionDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
