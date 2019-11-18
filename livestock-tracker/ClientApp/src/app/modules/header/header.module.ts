import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from '@app/app-routing.module';
import { HeaderComponent } from '@header/components/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    AppRoutingModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
