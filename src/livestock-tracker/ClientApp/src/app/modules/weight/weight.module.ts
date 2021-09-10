import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@matheo/datepicker';
import { MatDateFnsModule } from '@matheo/datepicker/date-fns';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AnimalSelectModule, LoaderModule } from '@shared/components';
import { SharedModule } from '@shared/shared.module';

import {
  WeightTransactionFormComponent,
  WeightTransactionListComponent
} from './components';
import {
  WeightTransactionsEditPage,
  WeightTransactionsNewPage,
  WeightTransactionsPage
} from './pages';
import { WeightEffects, WeightStore } from './store';
import { WeightProviderModule } from './weight-provider.module';
import { WeightRoutingModule } from './weight-routing.module';

@NgModule({
  declarations: [
    WeightTransactionListComponent,
    WeightTransactionsPage,
    WeightTransactionFormComponent,
    WeightTransactionsNewPage,
    WeightTransactionsEditPage
  ],
  imports: [
    AnimalSelectModule,
    CommonModule,
    FlexLayoutModule,
    LoaderModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SharedModule,
    WeightProviderModule,
    WeightRoutingModule,

    MatDatepickerModule,
    MatDateFnsModule,

    StoreModule.forFeature(
      WeightStore.constants.StoreKey,
      WeightStore.reducers.weightReducer
    ),
    EffectsModule.forFeature([WeightEffects])
  ]
})
export class WeightModule {}
