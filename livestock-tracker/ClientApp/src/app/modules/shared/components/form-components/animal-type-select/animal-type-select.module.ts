import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalProviderModule } from '@animal/animal-provider.module';
import { AnimalTypeSelectComponent } from '@shared/components/form-components/animal-type-select/animal-type-select.component';

@NgModule({
  declarations: [AnimalTypeSelectComponent],
  imports: [
    AnimalProviderModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [AnimalTypeSelectComponent, ReactiveFormsModule]
})
export class AnimalTypeSelectModule {
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
