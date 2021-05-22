import { NgModule } from '@angular/core';

import {
  WeightTransactionFormStubComponent,
  WeightTransactionListStubComponent
} from './components';

@NgModule({
  declarations: [
    WeightTransactionFormStubComponent,
    WeightTransactionListStubComponent
  ],
  exports: [
    WeightTransactionFormStubComponent,
    WeightTransactionListStubComponent
  ]
})
export class WeightTestingModule {}
