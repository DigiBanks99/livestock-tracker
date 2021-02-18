import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalProviderModule } from '@animal/animal-provider.module';
import { SvgProviderModule } from '@svg/svg-provider.module';

import { AnimalTypeSelectDisplayComponent } from './animal-type-select-display/animal-type-select-display.component';
import { AnimalTypeSelectComponent } from './animal-type-select.component';

@NgModule({
  declarations: [AnimalTypeSelectComponent, AnimalTypeSelectDisplayComponent],
  imports: [
    AnimalProviderModule,
    BrowserAnimationsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    SvgProviderModule
  ],
  exports: [AnimalTypeSelectComponent, ReactiveFormsModule]
})
export class AnimalTypeSelectModule {}
