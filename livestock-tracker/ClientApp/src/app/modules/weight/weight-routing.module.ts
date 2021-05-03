import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  WeightTransactionsEditPage,
  WeightTransactionsNewPage,
  WeightTransactionsPage
} from '@weight/pages';

const routes: Routes = [
  { path: '', component: WeightTransactionsPage, pathMatch: 'full' },
  { path: 'new', component: WeightTransactionsNewPage },
  { path: ':id/edit', component: WeightTransactionsEditPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeightRoutingModule {}
