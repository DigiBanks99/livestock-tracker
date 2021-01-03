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
import { MedicalModule } from '@medical/medical.module';
import { ReportsComponent } from '@reports/components/reports.component';
import { UnitContainerComponent } from '@unit/components/unit/unit.container';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'animal', component: AnimalComponent },
  { path: 'animal/new', component: AnimalNewComponent },
  { path: 'animal/:id/edit', component: AnimalDetailComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'units', component: UnitContainerComponent },
  { path: 'feed-type', component: FeedTypeContainerComponent },
  {
    path: 'feeding-transaction',
    component: FeedingTransactionContainerComponent,
  },
  {
    path: 'feeding-transaction/:animalId/new',
    component: FeedingTransactionNewComponent,
  },
  {
    path: 'feeding-transaction/:animalId/:id/edit',
    component: FeedingTransactionDetailComponent,
  },
  {
    path: 'medical',
    loadChildren: () =>
      import('./modules/medical/medical.module').then(
        (module) => module.MedicalModule
      ),
  },
];

@NgModule({
  imports: [AnimalModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
