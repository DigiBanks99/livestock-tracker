import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatSelectModule,
  MatDividerModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  NativeDateModule,
  MatCheckboxModule,
  MatRippleModule,
  MatSnackBarModule,
  MatCardModule,
  MatPaginatorModule,
  MatMenuModule
 } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { LivestockComponent } from './livestock/livestock.component';
import { ReportsComponent } from './reports/reports.component';
import { LivestockListComponent } from './livestock/livestock-list/livestock-list.component';
import { LivestockDetailComponent } from './livestock/livestock-detail/livestock-detail.component';
import { LivestockService } from './livestock/livestock.service';
import { MedicalComponent } from './medical/medical.component';
import { MedicalService } from './medical/medical.service';
import { MedicalTransactionComponent } from './medical/medical-transaction/medical-transaction.component';
import { UnitComponent } from './unit/unit.component';
import { UnitDetailComponent } from './unit/unit-detail/unit-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LivestockComponent,
    ReportsComponent,
    LivestockListComponent,
    LivestockDetailComponent,
    MedicalComponent,
    MedicalTransactionComponent,
    UnitComponent,
    UnitDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatInputModule,
    NativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRippleModule,
    MatSnackBarModule,
    MatCardModule,
    MatPaginatorModule,
    MatMenuModule
  ],
  providers: [LivestockService, MedicalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
