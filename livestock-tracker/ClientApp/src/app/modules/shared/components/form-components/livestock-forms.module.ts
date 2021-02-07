import { NgModule } from '@angular/core';
import { AnimalTypeSelectModule } from '@shared/components/form-components/animal-type-select/animal-type-select.module';
import { SvgProviderModule } from '@svg/svg-provider.module';

@NgModule({
  imports: [AnimalTypeSelectModule],
  exports: [AnimalTypeSelectModule, SvgProviderModule]
})
export class LivestockFormsModule {}
