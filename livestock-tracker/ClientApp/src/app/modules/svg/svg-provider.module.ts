import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [MatIconModule, HttpClientModule],
  exports: [MatIconModule]
})
export class SvgProviderModule {
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
