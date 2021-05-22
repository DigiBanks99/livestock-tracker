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
    [animalId]="animalId$ | async"
    [isLoading]="isFetching$ | async"
    [isSaving]="isSaving$ | async"
    [transaction]="transaction$ | async"
    (navigateBack)="onNavigateBack()"
    (save)="onSave($event)"
  ></app-weight-transaction-form>`
})
export class WeightTransactionsEditPage implements OnDestroy {
  public readonly animalId$: Observable<number>;
  public readonly isFetching$: Observable<boolean>;
  public readonly isSaving$: Observable<boolean>;
  public readonly transaction$: Observable<WeightTransaction>;

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly _store: Store<WeightState>,
    private readonly _router: Router
  ) {
    this.animalId$ = this.setupAnimalId();
    this.isFetching$ = this.setupIsFetching();
    this.isSaving$ = this.setupIsSaving();
    this.transaction$ = this.setupTransaction();
    this.navigateOnSaveSuccess();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onNavigateBack(): void {
    this._router.navigateByUrl('weight');
  }

  public onSave(transaction: WeightTransaction): void {
    this._store.dispatch(
      WeightStore.actions.updateItem(transaction, transaction.id)
    );
  }

  private navigateOnSaveSuccess(): void {
    this._store
      .pipe(
        select(WeightStore.selectors.saveState),
        filter((saveState: SaveState) => saveState === SaveState.Success),
        takeUntil(this._destroyed$)
      )
      .subscribe(() => {
        this._router.navigateByUrl('weight');
        this._store.dispatch(WeightStore.actions.resetSaveState());
      });
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
