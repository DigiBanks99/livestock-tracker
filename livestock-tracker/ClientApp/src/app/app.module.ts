import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '@store';
import { AnimalEffects } from '@animal-store/effects';

import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@home/home.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { HeaderComponent } from '@header/header.component';
import { LivestockComponent } from '@livestock/livestock.component';
import { ReportsComponent } from '@reports/reports.component';
import { LivestockListComponent } from '@livestock/livestock-list/livestock-list.component';
import { LivestockDetailComponent } from '@livestock/livestock-detail/livestock-detail.component';
import { LivestockService } from '@livestock/livestock.service';
import { MedicalComponent } from '@medical/medical.component';
import { MedicalService } from '@medical/medical.service';
import { MedicalTransactionComponent } from '@medical/medical-transaction/medical-transaction.component';
import { MedicalTransactionContainerComponent } from '@medical/medical-transaction/medical-transaction-container.component';
import { UnitComponent } from '@unit/unit.component';
import { UnitDetailComponent } from '@unit/unit-detail/unit-detail.component';
import { MedicineTypeComponent } from '@medical/medicine-type/medicine-type.component';
import { MedicineTypeDetailComponent } from '@medical/medicine-type/medicine-type-detail/medicine-type-detail.component';
import { MedicineTypeService } from '@medical/medicine-type/medicine-type.service';
import { FeedTypeComponent } from '@feed-type/feed-type.component';
import { FeedTypeService } from '@feed-type/feed-type.service';
import { FeedTypeDetailComponent } from '@feed-type/feed-type-detail/feed-type-detail.component';
import { FeedingTransactionComponent } from '@feeding-transaction/feeding-transaction.component';
import { FeedingTransactionService } from '@feeding-transaction/feeding-transaction.service';
import { LsGridComponent } from '@shared/ls-grid/ls-grid.component';
import { FeedingTransactionDetailComponent } from '@feeding-transaction/feeding-transaction-detail/feeding-transaction-detail.component';
import { AnimalSelectContainerComponent } from '@shared/animal-select/animal-select-container.component';
import { AnimalSelectComponent } from '@shared/animal-select/animal-select.component';
import { LivestockFormComponent } from '@livestock/livestock-form/livestock-form.component';
import { LivestockNewComponent } from './livestock/livestock-new/livestock-new.component';
import { MedicalContainerComponent } from '@medical/medical-container.component';
import { FeedingTransactionContainerComponent } from '@feeding-transaction/feeding-transaction-container.component';
import { FeedingTransactionEffects } from '@feeding-transaction-store/effect';
import { FeedingTransactionFormComponent } from '@feeding-transaction/feeding-transaction-form/feeding-transaction-form.component';
import { FeedingTransactionNewComponent } from '@feeding-transaction/feeding-transaction-new/feeding-transaction-new.component';
import { FeedTypeContainerComponent } from '@feed-type/feed-type-container.component';
import { UnitContainerComponent } from '@unit/unit-container.component';
import { UnitEffects } from '@unit-store/effects';
import { FeedTypeEffects } from '@feed-type-store/effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LivestockComponent,
    ReportsComponent,
    LivestockListComponent,
    LivestockDetailComponent,
    LivestockFormComponent,
    LivestockNewComponent,
    MedicalComponent,
    MedicalContainerComponent,
    MedicalTransactionContainerComponent,
    MedicalTransactionComponent,
    UnitContainerComponent,
    UnitComponent,
    UnitDetailComponent,
    MedicineTypeComponent,
    MedicineTypeDetailComponent,
    LsGridComponent,
    FeedTypeContainerComponent,
    FeedTypeComponent,
    FeedTypeDetailComponent,
    FeedingTransactionNewComponent,
    FeedingTransactionComponent,
    FeedingTransactionContainerComponent,
    FeedingTransactionFormComponent,
    FeedingTransactionDetailComponent,
    AnimalSelectContainerComponent,
    AnimalSelectComponent
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
    MatMenuModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AnimalEffects,
      FeedingTransactionEffects,
      UnitEffects,
      FeedTypeEffects
    ])
  ],
  providers: [
    LivestockService,
    MedicalService,
    MedicineTypeService,
    FeedTypeService,
    FeedingTransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
