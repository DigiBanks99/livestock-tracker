import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { FeedModule } from '@feed/feed.module';
import { HeaderModule } from '@header/header.module';
import { HomeModule } from '@home/home.module';
import { LivestockModule } from '@livestock/livestock.module';
import { AnimalEffects } from '@livestock/store/animal.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReportsModule } from '@reports/reports.module';
import { SharedModule } from '@shared/shared.module';
import { UnitModule } from '@unit/unit.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    AppRoutingModule,

    SharedModule,
    LivestockModule,
    FeedModule,
    HeaderModule,
    HomeModule,
    ReportsModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UnitModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
