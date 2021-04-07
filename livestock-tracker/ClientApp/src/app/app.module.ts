import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalModule } from '@animal/animal.module';
import { BaseUrlProvider } from '@core/di/base-url.injection-token';
import { FeedModule } from '@feed/feed.module';
import { HeaderModule } from '@header/header.module';
import { HomeModule } from '@home/home.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReportsModule } from '@reports/reports.module';
import { SharedModule } from '@shared/shared.module';
import { UnitModule } from '@unit/unit.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    AppRoutingModule,

    SharedModule,

    AnimalModule,
    FeedModule,
    HeaderModule,
    HomeModule,
    ReportsModule,
    UnitModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    BaseUrlProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
