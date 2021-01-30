import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from '@home/components/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatCardModule, MatGridListModule],
  exports: [HomeComponent]
})
export class HomeModule {}
