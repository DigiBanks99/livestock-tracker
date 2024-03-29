import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SaveState } from '@core/models';
import { getSelectedAnimalId } from '@core/store/selectors';
import { select, Store } from '@ngrx/store';
import { WeightState, WeightTransaction } from '@weight/interfaces';
import { WeightStore } from '@weight/store';

@Component({
  template: `<app-weight-transaction-form
    backLink="../.."
    [animalId]="animalId$ | async"
    [isLoading]="isFetching$ | async"
    [isSaving]="isSaving$ | async"
    [transaction]="transaction$ | async"
    (save)="onSave($event)"
  ></app-weight-transaction-form>`
})
export class WeightTransactionsEditPage implements OnDestroy {
  public readonly animalId$: Observable<number>;
  public readonly isFetching$: Observable<boolean>;
  public readonly isSaving$: Observable<boolean>;
  public readonly transaction$: Observable<WeightTransaction>;

  private readonly _destroyed$ = new Subject<void>();

  constructor(private readonly _store: Store<WeightState>) {
    this.animalId$ = this.setupAnimalId();
    this.isFetching$ = this.setupIsFetching();
    this.isSaving$ = this.setupIsSaving();
    this.transaction$ = this.setupTransaction();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onSave(transaction: WeightTransaction): void {
    this._store.dispatch(
      WeightStore.actions.updateItem(transaction, transaction.id)
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
      select(WeightStore.selectors.isFetching),
      takeUntil(this._destroyed$)
    );
  }

  private setupIsSaving(): Observable<boolean> {
    return this._store.pipe(
      select(WeightStore.selectors.saveState),
      map((saveState: SaveState) => saveState === SaveState.Saving),
      takeUntil(this._destroyed$)
    );
  }

  private setupTransaction(): Observable<WeightTransaction> {
    return this._store.pipe(
      select(WeightStore.selectors.selectedWeightTransaction),
      filter(
        (transaction: WeightTransaction | null | undefined) =>
          transaction != null
      ),
      takeUntil(this._destroyed$)
    );
  }
}
