import {
  Component,
  NgModule
} from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent {}

@NgModule({
  declarations: [StatsCardComponent],
  exports: [StatsCardComponent],
  imports: []
})
export class StatsCardComponentModule {}
