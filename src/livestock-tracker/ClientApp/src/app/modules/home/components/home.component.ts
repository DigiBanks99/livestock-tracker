import {
  ChangeDetectionStrategy,
  Component,
  NgModule
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { KraalStatsModule } from './stats';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [KraalStatsModule, MatGridListModule]
})
export class HomeComponentModule {}
