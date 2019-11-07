import { NgModule } from '@angular/core';
import { AnimalSelectContainerComponent } from './animal-select/animal-select-container.component';
import { AnimalSelectComponent } from './animal-select/animal-select.component';
import { LsGridComponent } from './ls-grid/ls-grid.component';
import { AgeCalculatorService } from './age-calculator.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AnimalSelectContainerComponent,
    AnimalSelectComponent,
    LsGridComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule
  ],
  providers: [AgeCalculatorService],
  exports: [AnimalSelectContainerComponent, LsGridComponent]
})
export class SharedModule {}
