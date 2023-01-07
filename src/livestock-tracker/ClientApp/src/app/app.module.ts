import {
  ModuleWithProviders,
  NgModule,
  Type
} from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalModule } from '@animal/animal.module';
import { HeaderModule } from '@header/header.module';
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

const imports: (unknown[] | ModuleWithProviders<unknown> | Type<unknown>)[] = [
  BrowserAnimationsModule,
  AppRoutingModule,
  MatNativeDateModule,

  SharedModule,

  AnimalModule,
  HeaderModule,
  ReportsModule,
  UnitModule,

  StoreModule.forRoot({
    router: routerReducer
  }),
  StoreRouterConnectingModule.forRoot({
    navigationActionTiming: NavigationActionTiming.PreActivation
  }),
  EffectsModule.forRoot([])
];

if (!environment.production) {
  imports.push(
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  );
}

@NgModule({
  declarations: [AppComponent],
  imports,
  providers: [
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
