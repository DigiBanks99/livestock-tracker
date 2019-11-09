import { NgModule } from '@angular/core';
import { UnitContainerComponent } from './unit-container.component';
import { UnitComponent } from './unit.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { UnitService } from './unit.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    ReactiveFormsModule
  ],
  providers: [UnitService],
  exports: [UnitContainerComponent, UnitDetailComponent]
})
export class UnitModule {}
