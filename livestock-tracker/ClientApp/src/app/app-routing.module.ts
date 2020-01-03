import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedingTransactionContainerComponent } from '@feed/components';
import { FeedTypeContainerComponent } from '@feed/components/feed-type/feed-type.container';
import { FeedingTransactionDetailComponent } from '@feed/components/feeding-transaction-detail/feeding-transaction-detail.component';
import { FeedingTransactionNewComponent } from '@feed/components/feeding-transaction-new/feeding-transaction-new.component';
import { HomeComponent } from '@home/components/home.component';
import { LivestockDetailComponent } from '@livestock/components/livestock-detail/livestock-detail.component';
import { LivestockNewComponent } from '@livestock/components/livestock-new/livestock-new.component';
import { LivestockComponent } from '@livestock/components/livestock/livestock.component';
import { LivestockModule } from '@livestock/livestock.module';
import { MedicalContainerComponent } from '@medical/components/medical/medical.container';
import { MedicineTypeComponent } from '@medical/components/medicine-type/medicine-type.component';
import { MedicalModule } from '@medical/medical.module';
import { ReportsComponent } from '@reports/components/reports.component';
import { UnitContainerComponent } from '@unit/components/unit/unit.container';

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
  { path: 'units', component: UnitContainerComponent },
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
  imports: [MedicalModule, LivestockModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
