import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeightTransactionsPage } from '@app/modules/weight/pages';

const routes: Routes = [{ path: '', component: WeightTransactionsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeightRoutingModule {}
