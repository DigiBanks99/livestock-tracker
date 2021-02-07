import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalProviderModule } from '@animal/animal-provider.module';
import { SvgProviderModule } from '@svg/svg-provider.module';

import { AnimalTypeSelectComponent } from './animal-type-select.component';

@NgModule({
  declarations: [AnimalTypeSelectComponent],
  imports: [
    AnimalProviderModule,
    BrowserAnimationsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    SvgProviderModule
  ],
  exports: [AnimalTypeSelectComponent, ReactiveFormsModule]
})
export class AnimalTypeSelectModule {}
