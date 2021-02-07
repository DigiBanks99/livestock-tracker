import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalProviderModule } from '@animal/animal-provider.module';
import {
  AnimalSelectComponent,
  AnimalSelectContainer
} from '@shared/components/animal-select';

import { AnimalSelectDisplayComponent } from './animal-select-display/animal-select-display.component';

@NgModule({
  declarations: [
    AnimalSelectComponent,
    AnimalSelectContainer,
    AnimalSelectDisplayComponent
  ],
  exports: [
    AnimalSelectComponent,
    AnimalSelectContainer,
    BrowserAnimationsModule
  ],
  imports: [
    AnimalProviderModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class AnimalSelectModule {
  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon(
      'farmer',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/farmer.svg')
    );
    matIconRegistry.addSvgIcon(
      'cow',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/cow.svg')
    );
    matIconRegistry.addSvgIcon(
      'chicken',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/cock.svg')
    );
    matIconRegistry.addSvgIcon(
      'pig',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/pig.svg')
    );
    matIconRegistry.addSvgIcon(
      'sheep',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/sheep.svg')
    );
  }
}
