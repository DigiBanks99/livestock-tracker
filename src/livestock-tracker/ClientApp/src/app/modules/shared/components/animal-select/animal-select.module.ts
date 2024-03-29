import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AnimalProviderModule } from '@animal/animal-provider.module';
import { SvgProviderModule } from '@svg/svg-provider.module';

import { AnimalSelectDisplayComponent } from './animal-select-display/animal-select-display.component';
import { AnimalSelectComponent } from './animal-select.component';
import { AnimalSelectContainer } from './animal-select.container';

@NgModule({
  declarations: [
    AnimalSelectComponent,
    AnimalSelectContainer,
    AnimalSelectDisplayComponent
  ],
  exports: [AnimalSelectComponent, AnimalSelectContainer],
  imports: [
    AnimalProviderModule,
    CommonModule,
    FlexModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    SvgProviderModule
  ]
})
export class AnimalSelectModule {}
