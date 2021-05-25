import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  imports: [MatProgressSpinnerModule]
})
export class LoaderModule {}
