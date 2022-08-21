import {
  Observable,
  Subject
} from 'rxjs';
import {
  map,
  takeUntil
} from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  OnDestroy
} from '@angular/core';
import {
  Router,
  RouterModule
} from '@angular/router';
import {
  FeedingTransaction,
  FeedType,
  SaveState,
  Unit
} from '@core/models';
import { AppState } from '@core/store';
import {
  getSelectedAnimalId,
  getUnits
} from '@core/store/selectors';
import { FeedStore } from '@feed-store';
import {
  select,
  Store
} from '@ngrx/store';

import { FeedingTransactionFormComponentModule } from '../components';

@Component({
  template: `<app-feeding-transaction-form
    (save)="onSave($event)"
    [animalId]="animalId$ | async"
    [feedTypes]="feedTypes$ | async"
    [isLoading]="isFetching$ | async"
    [units]="units$ | async"
    backLink="../"
  ></app-feeding-transaction-form> `
})
export class FeedingTransactionNewPage implements OnDestroy {
  public readonly animalId$: Observable<number>;
  public readonly isFetching$: Observable<boolean>;
  public readonly isSaving$: Observable<boolean>;
  public readonly feedTypes$: Observable<FeedType[]>;
  public readonly units$: Observable<Unit[]>;

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _router: Router
  ) {
    this.animalId$ = this.setupAnimalId();
    this.isFetching$ = this.setupIsFetching();
    this.isSaving$ = this.setupIsSaving();
    this.feedTypes$ = this.setupFeedTypes();
    this.units$ = this.setupUnits();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onSave(transaction: FeedingTransaction) {
    this._store.dispatch(FeedStore.Transactions.actions.addItem(transaction));
    return this._router.navigate(['feed']);
  }

  private setupAnimalId(): Observable<number> {
    return this._store.pipe(
      select(getSelectedAnimalId),
      takeUntil(this._destroyed$)
    );
  }

  private setupIsFetching(): Observable<boolean> {
    return this._store.pipe(
      select(FeedStore.Transactions.selectors.isPendingTransaction),
      takeUntil(this._destroyed$)
    );
  }

  private setupIsSaving(): Observable<boolean> {
    return this._store.pipe(
      select(FeedStore.Transactions.selectors.saveState),
      map((saveState: SaveState) => saveState === SaveState.Saving),
      takeUntil(this._destroyed$)
    );
  }

  private setupFeedTypes(): Observable<FeedType[]> {
    return this._store.pipe(
      select(FeedStore.Feed.selectors.feedTypes),
      takeUntil(this._destroyed$)
    );
  }

  private setupUnits(): Observable<Unit[]> {
    return this._store.pipe(select(getUnits), takeUntil(this._destroyed$));
  }
}

@NgModule({
  declarations: [FeedingTransactionNewPage],
  exports: [FeedingTransactionNewPage],
  imports: [CommonModule, FeedingTransactionFormComponentModule, RouterModule]
})
export class FeedingTransactionNewPageModule {}
