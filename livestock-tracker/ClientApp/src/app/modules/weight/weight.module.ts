import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoaderModule } from '@shared/components';
import { SharedModule } from '@shared/shared.module';
import { WeightTransactionsPage } from '@weight/pages';
import { WeightEffects, WeightStore } from '@weight/store';

import { WeightTransactionListComponent } from './components';
import { WeightProviderModule } from './weight-provider.module';
import { WeightRoutingModule } from './weight-routing.module';

@NgModule({
  declarations: [WeightTransactionListComponent, WeightTransactionsPage],
  imports: [
    CommonModule,
    LoaderModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    SharedModule,
    WeightProviderModule,
    WeightRoutingModule,

    StoreModule.forFeature(
      WeightStore.constants.StoreKey,
      WeightStore.reducers.weightReducer
    ),
    EffectsModule.forFeature([WeightEffects])
  ]
})
export class WeightModule {}
