import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { MedicineTypeComponent } from './medical/medicine-type/medicine-type.component';
import { MedicineTypeDetailComponent } from './medical/medicine-type/medicine-type-detail/medicine-type-detail.component';
import { MedicineTypeService } from './medical/medicine-type/medicine-type.service';
import { FeedTypeComponent } from './feed-type/feed-type.component';
import { FeedTypeService } from './feed-type/feed-type.service';
import { FeedTypeDetailComponent } from './feed-type/feed-type-detail/feed-type-detail.component';
import { FeedingTransactionComponent } from './feeding-transaction/feeding-transaction.component';
import { FeedingTransactionService } from './feeding-transaction/feeding-transaction.service';
import { LsGridComponent } from './shared/ls-grid/ls-grid.component';
import { FeedingTransactionDetailComponent } from './feeding-transaction/feeding-transaction-detail/feeding-transaction-detail.component';
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
    UnitDetailComponent,
    MedicineTypeComponent,
    MedicineTypeDetailComponent,
    FeedTypeComponent,
    FeedTypeDetailComponent,
    FeedingTransactionComponent,
    LsGridComponent,
    FeedingTransactionDetailComponent
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
  providers: [LivestockService, MedicalService, MedicineTypeService, FeedTypeService, FeedingTransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
