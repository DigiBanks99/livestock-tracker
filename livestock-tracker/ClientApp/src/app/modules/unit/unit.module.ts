import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UnitDetailComponent } from '@unit/components/unit-detail/unit-detail.component';
import { UnitComponent } from '@unit/components/unit/unit.component';
import { UnitContainerComponent } from '@unit/components/unit/unit.container';
import { UnitService } from '@unit/services/unit.service';
import { unitEffects, unitReducers } from '@unit/store';

@NgModule({
  declarations: [UnitContainerComponent, UnitComponent, UnitDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatToolbarModule,
    ReactiveFormsModule,
    StoreModule.forFeature('units', unitReducers.unitReducer),
    EffectsModule.forFeature([unitEffects.UnitEffects])
  ],
  providers: [UnitService],
  exports: [UnitContainerComponent, UnitComponent, UnitDetailComponent]
})
export class UnitModule {}
