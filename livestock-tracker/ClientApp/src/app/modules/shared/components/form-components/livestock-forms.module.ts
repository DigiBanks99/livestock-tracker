import { NgModule } from '@angular/core';
import { AnimalTypeSelectModule } from '@shared/components/form-components/animal-type-select/animal-type-select.module';

@NgModule({
  imports: [AnimalTypeSelectModule],
  exports: [AnimalTypeSelectModule]
})
export class LivestockFormsModule {}
