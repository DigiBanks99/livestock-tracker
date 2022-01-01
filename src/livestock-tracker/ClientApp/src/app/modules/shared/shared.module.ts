import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LivestockFormsModule } from '@shared/components/form-components/livestock-forms.module';
import { AgeCalculatorService } from '@shared/services';

import { AnimalSelectModule, CommandButtonComponent } from './components';
import { LookupPipe } from './pipes/lookup.pipe';

@NgModule({
  declarations: [CommandButtonComponent, LookupPipe],
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
    LookupPipe
  ]
})
export class SharedModule {}
