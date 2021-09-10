import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from '@home/components/home.component';
import { SvgProviderModule } from '@svg/svg-provider.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatCardModule, MatGridListModule, SvgProviderModule],
  exports: [HomeComponent]
})
export class HomeModule {}
