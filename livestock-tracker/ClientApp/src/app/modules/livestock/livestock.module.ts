import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { animalEffects, animalReducers } from '@animal-store';
import { LivestockDetailComponent } from '@livestock/components/livestock-detail/livestock-detail.component';
import { LivestockFormComponent } from '@livestock/components/livestock-form/livestock-form.component';
import { LivestockListComponent } from '@livestock/components/livestock-list/livestock-list.component';
import { LivestockNewComponent } from '@livestock/components/livestock-new/livestock-new.component';
import { LivestockComponent } from '@livestock/components/livestock/livestock.component';
import { LivestockService } from '@livestock/services/livestock.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    LivestockComponent,
    LivestockNewComponent,
    LivestockListComponent,
    LivestockDetailComponent,
    LivestockFormComponent
  ],
  imports: [
    CommonModule,
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
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature('animals', animalReducers.animalsReducer),
    EffectsModule.forFeature([animalEffects.AnimalEffects])
  ],
  providers: [LivestockService],
  exports: [LivestockComponent]
})
export class LivestockModule {}
