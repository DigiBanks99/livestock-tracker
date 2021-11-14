import { NgModule } from '@angular/core';

import { AnimalSelectStubContainer } from './animal-select.stub.container';

@NgModule({
  declarations: [AnimalSelectStubContainer],
  exports: [AnimalSelectStubContainer]
})
export class AnimalSelectTestingModule {}
