import {
  Observable,
  Subject,
  takeUntil
} from 'rxjs';

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnDestroy
} from '@angular/core';
import { KraalStats } from '@animal/models';
import { AnimalStore } from '@animal/store';
import {
  select,
  Store,
  StoreRootModule
} from '@ngrx/store';

import { StatsCardComponentModule } from './stats-card.component';

@Component({
  selector: 'app-kraal-stats-view',
  template: `<article class="kraal-stats">
    <h2>Kraal stats</h2>
    <section>
      <app-stats-card>
        <span description>Animal Count</span>
        {{ stats.animalCount | number }}
      </app-stats-card>
      <app-stats-card>
        <span description>Weight (Avg)</span>
        {{ stats.averageWeight | number: '1.0-2' }} kg
      </app-stats-card>
      <app-stats-card>
        <span description>Price (Avg)</span>
        {{ stats.averageAnimalCost | currency: 'R' }}
      </app-stats-card>
      <app-stats-card>
        <span description>Sold For (Avg)</span>
        {{ stats.averageSellPrice | currency: 'R' }}
      </app-stats-card>
      <app-stats-card>
        <span description>Rate of death</span>
        {{ stats.deathRate | percent }}
      </app-stats-card>
    </section>
  </article>`,
  styleUrls: ['./kraal-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KraalStatsComponent {
  @Input() public stats: KraalStats = new KraalStats();
}

@NgModule({
  declarations: [KraalStatsComponent],
  exports: [KraalStatsComponent],
  imports: [CommonModule, StatsCardComponentModule]
})
export class KraalStatsComponentModule {}

@Component({
  selector: 'app-kraal-stats',
  template: `<app-kraal-stats-view
    [stats]="stats$ | async"
  ></app-kraal-stats-view>`
})
export class KraalStatsContainer implements OnDestroy {
  public readonly stats$: Observable<KraalStats>;

  private readonly _destroyed$ = new Subject<void>();

  constructor(private readonly _store: Store) {
    this._store.dispatch(AnimalStore.actions.FetchKraalStats());
    this.stats$ = this.setupStats();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private setupStats(): Observable<KraalStats> {
    return this._store.pipe(
      select(AnimalStore.selectors.kraalStats),
      takeUntil(this._destroyed$)
    );
  }
}

@NgModule({
  declarations: [KraalStatsContainer],
  exports: [KraalStatsContainer],
  imports: [CommonModule, KraalStatsComponentModule, StoreRootModule]
})
export class KraalStatsModule {}
