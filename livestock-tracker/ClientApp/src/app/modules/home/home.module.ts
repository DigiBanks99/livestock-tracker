import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from '@home/components/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule],
  exports: [HomeComponent]
})
export class HomeModule {}
