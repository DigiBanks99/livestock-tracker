import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@header/components/header.component';
import { SharedModule } from '@shared/shared.module';
import { SvgProviderModule } from '@svg/svg-provider.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    RouterModule,
    SharedModule,
    SvgProviderModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
