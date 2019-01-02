import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from '@home/home.component';
import { LivestockComponent } from '@livestock/livestock.component';
import { LivestockNewComponent } from '@livestock/livestock-new/livestock-new.component';
import { LivestockDetailComponent } from '@livestock/livestock-detail/livestock-detail.component';
import { ReportsComponent } from '@reports/reports.component';
import { MedicineTypeComponent } from '@medical/medicine-type/medicine-type.component';
import { MedicalContainerComponent } from '@medical/medical-container.component';
import { FeedingTransactionDetailComponent } from '@feeding-transaction/feeding-transaction-detail/feeding-transaction-detail.component';
import { FeedingTransactionContainerComponent } from '@feeding-transaction/feeding-transaction-container.component';
import { FeedingTransactionNewComponent } from '@feeding-transaction/feeding-transaction-new/feeding-transaction-new.component';
import { FeedTypeContainerComponent } from '@feed-type/feed-type-container.component';
import { UnitComponent } from '@unit/unit.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'livestock',
    component: LivestockComponent,
    children: [
      { path: 'new', component: LivestockNewComponent },
      { path: ':id/edit', component: LivestockDetailComponent }
    ]
  },
  { path: 'medical', component: MedicalContainerComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'units', component: UnitComponent },
  { path: 'medicine-type', component: MedicineTypeComponent },
  { path: 'feed-type', component: FeedTypeContainerComponent },
  {
    path: 'feeding-transaction',
    component: FeedingTransactionContainerComponent,
    children: [
      { path: ':animalId/new', component: FeedingTransactionNewComponent },
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
