import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatCommonModule,
  MatNativeDateModule,
  MatOptionModule
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  AnimalComponent,
  AnimalDetailComponent,
  AnimalFormComponent,
  AnimalListComponent,
  AnimalNewComponent
} from '@animal/components';
import { AnimalService, LivestockService } from '@animal/services';
import { animalEffects, animalReducers } from '@animal/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AnimalComponent,
    AnimalNewComponent,
    AnimalListComponent,
    AnimalDetailComponent,
    AnimalFormComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatListModule,
    MatOptionModule,
    MatPaginatorModule,
    MatCommonModule,
    MatDividerModule,
    MatNativeDateModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature('animals', animalReducers.animalsReducer),
    EffectsModule.forFeature([animalEffects.AnimalEffects]),
  ],
  providers: [LivestockService, AnimalService],
  exports: [AnimalComponent],
})
export class AnimalModule {}
