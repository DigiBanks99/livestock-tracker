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
import { SaveState } from '@core/models';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import {
  getSelectedAnimalId,
  getUnits
} from '@core/store/selectors';
import { FeedStore } from '@feed-store';
import { actions } from '@feed/store/feeding-transaction.actions';
import {
  select,
  Store
} from '@ngrx/store';

import { FeedingTransactionFormComponentModule } from '../feeding-transaction-form/feeding-transaction-form.component';

@Component({
  selector: 'app-feeding-transaction-new',
  templateUrl: './feeding-transaction-new.component.html'
})
export class FeedingTransactionNewComponent implements OnDestroy {
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
    this._store.dispatch(actions.addItem(transaction));
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
  declarations: [FeedingTransactionNewComponent],
  exports: [FeedingTransactionNewComponent],
  imports: [CommonModule, FeedingTransactionFormComponentModule, RouterModule]
})
export class FeedingTransactionNewComponentModule {}
