import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WeightTransactionsPage } from '@app/modules/weight/pages';

import { WeightComponent } from './components';
import { WeightProviderModule } from './weight-provider.module';
import { WeightRoutingModule } from './weight-routing.module';

@NgModule({
  declarations: [WeightComponent, WeightTransactionsPage],
  imports: [CommonModule, WeightProviderModule, WeightRoutingModule]
})
export class WeightModule {}
