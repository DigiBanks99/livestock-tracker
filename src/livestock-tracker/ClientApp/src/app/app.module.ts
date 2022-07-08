import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalModule } from '@animal/animal.module';
import { BaseUrlProvider } from '@core/di/base-url.injection-token';
import { FeedModule } from '@feed/feed.module';
import { HeaderModule } from '@header/header.module';
import { HomeModule } from '@home/home.module';
import { MatNativeDateModule } from '@matheo/datepicker/core';
import { EffectsModule } from '@ngrx/effects';
import {
  NavigationActionTiming,
  routerReducer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReportsModule } from '@reports/reports.module';
import { SharedModule } from '@shared/shared.module';
import { UnitModule } from '@unit/unit.module';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    MatNativeDateModule,

    SharedModule,

    AnimalModule,
    FeedModule,
    HeaderModule,
    HomeModule,
    ReportsModule,
    UnitModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({
      router: routerReducer
    }),
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PreActivation
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    BaseUrlProvider,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-US'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
