import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SvgProviderModule } from '@app/modules/svg/svg-provider.module';
import { HomeComponent } from '@home/components/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatCardModule, MatGridListModule, SvgProviderModule],
  exports: [HomeComponent]
})
export class HomeModule {}
