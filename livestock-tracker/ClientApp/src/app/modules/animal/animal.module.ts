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
import { AnimalProviderModule } from '@animal/animal-provider.module';
import { AnimalRoutingModule } from '@animal/animal-routing.module';
import { AnimalFormComponent, AnimalListComponent } from '@animal/components';
import { AnimalDetailPage, AnimalListPage, AnimalNewPage } from '@animal/pages';
import { animalEffects, animalReducers } from '@animal/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoaderModule } from '@shared/components';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AnimalDetailPage,
    AnimalFormComponent,
    AnimalListComponent,
    AnimalListPage,
    AnimalNewPage
  ],
  imports: [
    AnimalRoutingModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LoaderModule,
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
    SharedModule,
    AnimalProviderModule,
    StoreModule.forFeature('animals', animalReducers.animalsReducer),
    EffectsModule.forFeature([animalEffects.AnimalEffects])
  ]
})
export class AnimalModule {}
