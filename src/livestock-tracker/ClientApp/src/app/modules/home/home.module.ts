import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  HomeComponent,
  HomeComponentModule
} from './components';

@NgModule({
  declarations: [],
  imports: [
    HomeComponentModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }])
  ],
  exports: [HomeComponentModule]
})
export class HomeModule {}
