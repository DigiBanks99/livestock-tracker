import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AnimalSelectComponent } from '@shared/components/animal-select/animal-select.component';
import { AnimalSelectContainerComponent } from '@shared/components/animal-select/animal-select.container';
import { LsGridComponent } from '@shared/components/ls-grid/ls-grid.component';
import { AgeCalculatorService } from '@shared/services/age-calculator.service';

@NgModule({
  declarations: [
    AnimalSelectContainerComponent,
    AnimalSelectComponent,
    LsGridComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatToolbarModule
  ],
  providers: [AgeCalculatorService],
  exports: [AnimalSelectContainerComponent, LsGridComponent]
})
export class SharedModule {}
