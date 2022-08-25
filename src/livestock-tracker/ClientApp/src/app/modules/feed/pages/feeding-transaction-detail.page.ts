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
    [animalId]="animalId$ | async"
    [feedTypes]="feedTypes$ | async"
    [transaction]="transaction$ | async"
    [isLoading]="isFetching$ | async"
    [units]="units$ | async"
    (save)="onSave($event)"
    backLink="../.."
  ></app-feeding-transaction-form> `
})
export class FeedingTransactionDetailPage implements OnDestroy {
  public readonly animalId$: Observable<number>;
  public readonly isFetching$: Observable<boolean>;
  public readonly isSaving$: Observable<boolean>;
  public readonly transaction$: Observable<FeedingTransaction>;
  public readonly feedTypes$: Observable<FeedType[]>;
  public readonly units$: Observable<Unit[]>;

  private readonly _destroyed$ = new Subject<void>();

  constructor(private readonly _store: Store<AppState>) {
    this.animalId$ = this.setupAnimalId();
    this.isFetching$ = this.setupIsFetching();
    this.isSaving$ = this.setupIsSaving();
    this.transaction$ = this.setupTransaction();
    this.feedTypes$ = this.setupFeedTypes();
    this.units$ = this.setupUnits();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onSave(transaction: FeedingTransaction): void {
    this._store.dispatch(
      FeedStore.Transactions.actions.updateItem(transaction, transaction.id)
    );
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
      map((saveState: SaveState): boolean => SaveState.Saving === saveState),
      takeUntil(this._destroyed$)
    );
  }

  private setupTransaction(): Observable<FeedingTransaction> {
    return this._store.pipe(
      select(FeedStore.Transactions.selectors.selectedFeedingTransaction),
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
  declarations: [FeedingTransactionDetailPage],
  exports: [FeedingTransactionDetailPage],
  imports: [CommonModule, FeedingTransactionFormComponentModule]
})
export class FeedingTransactionDetailPageModule {}
