import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AgeCalculatorService } from '@shared/services';

import {
  AnimalSelectComponent,
  AnimalSelectContainerComponent,
  AnimalTypeSelectComponent,
  CommandButtonComponent,
  LsGridComponent
} from './components';
import { LookupPipe } from './pipes/lookup.pipe';

@NgModule({
  declarations: [
    AnimalSelectContainerComponent,
    AnimalSelectComponent,
    AnimalTypeSelectComponent,
    CommandButtonComponent,
    LsGridComponent,
    LookupPipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
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
    AnimalSelectContainerComponent,
    AnimalTypeSelectComponent,
    CommandButtonComponent,
    LookupPipe,
    LsGridComponent
  ]
})
export class SharedModule {}
