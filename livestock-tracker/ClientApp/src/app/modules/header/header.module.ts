import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from '@app/app-routing.module';
import { HeaderComponent } from '@header/components/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
