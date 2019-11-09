import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { AppRoutingModule } from '@app/app-routing.module';
import { FeedingTransactionEffects } from '@feeding-transaction-store/effect';
import { UnitEffects } from '@unit-store/effects';
import { FeedTypeEffects } from '@feed-type-store/effects';
import { SharedModule } from '@shared/shared.module';
import { LivestockModule } from '@livestock/livestock.module';
import { FeedTypeModule } from '@feed-type/feed-type.module';
import { FeedingTransactionModule } from '@feeding-transaction/feeding-transaction.module';
import { HeaderModule } from '@header/header.module';
import { HomeModule } from '@home/home.module';
import { ReportsModule } from '@reports/reports.module';
import { UnitModule } from '@unit/unit.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    AppRoutingModule,

    SharedModule,
    LivestockModule,
    FeedTypeModule,
    FeedingTransactionModule,
    HeaderModule,
    HomeModule,
    ReportsModule,
    UnitModule,

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AnimalEffects,
      FeedingTransactionEffects,
      UnitEffects,
      FeedTypeEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
