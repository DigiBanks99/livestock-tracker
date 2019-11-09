import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

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
