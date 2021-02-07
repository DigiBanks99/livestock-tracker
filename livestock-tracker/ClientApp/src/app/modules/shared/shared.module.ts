import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { LivestockFormsModule } from '@shared/components/form-components/livestock-forms.module';
import { AgeCalculatorService } from '@shared/services';

import {
  AnimalSelectModule,
  CommandButtonComponent,
  LsGridComponent
} from './components';
import { LookupPipe } from './pipes/lookup.pipe';

@NgModule({
  declarations: [CommandButtonComponent, LsGridComponent, LookupPipe],
  imports: [
    AnimalSelectModule,
    CommonModule,
    FlexLayoutModule,
    LivestockFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [AgeCalculatorService],
  exports: [
    AnimalSelectModule,
    CommandButtonComponent,
    LivestockFormsModule,
    LookupPipe,
    LsGridComponent
  ]
})
export class SharedModule {
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
