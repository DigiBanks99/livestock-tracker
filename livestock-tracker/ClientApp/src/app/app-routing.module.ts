import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AnimalComponent,
  AnimalDetailComponent,
  AnimalNewComponent
} from '@animal/components';
import { AnimalModule } from '@animal/index';
import { FeedingTransactionContainerComponent } from '@feed/components';
import { FeedTypeContainerComponent } from '@feed/components/feed-type/feed-type.container';
import { FeedingTransactionDetailComponent } from '@feed/components/feeding-transaction-detail/feeding-transaction-detail.component';
import { FeedingTransactionNewComponent } from '@feed/components/feeding-transaction-new/feeding-transaction-new.component';
import { HomeComponent } from '@home/components/home.component';
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
    component: AnimalComponent,
    children: [
      { path: 'new', component: AnimalNewComponent },
      { path: ':id/edit', component: AnimalDetailComponent }
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
  imports: [MedicalModule, AnimalModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
