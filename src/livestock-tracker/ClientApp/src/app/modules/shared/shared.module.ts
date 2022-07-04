import { NgModule } from '@angular/core';
import { LivestockFormsModule } from '@shared/components/form-components/livestock-forms.module';
import { AgeCalculatorService } from '@shared/services';

import {
  AnimalSelectModule,
  CommandButtonComponentModule
} from './components';
import { LookupPipeModule } from './pipes/lookup.pipe';

@NgModule({
  providers: [AgeCalculatorService],
  exports: [
    AnimalSelectModule,
    CommandButtonComponentModule,
    LivestockFormsModule,
    LookupPipeModule
  ]
})
export class SharedModule {}
