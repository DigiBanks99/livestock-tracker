import { combineLatest, EMPTY, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Animal, FeedingTransaction, FeedType, Unit } from '@core/models';
import { AppState } from '@core/store';
import { getSelectedAnimal, getUnits } from '@core/store/selectors';
import { environment } from '@env/environment';
import { feedingTransactionStore, feedTypeStore } from '@feed-store';
import { FetchFeedTypesAction } from '@feed/store/feed-type.actions';
import {
  actions,
  FetchFeedingTransactionAction as FetchFeedingTransactions,
  SelectFeedTransactionAction
} from '@feed/store/feeding-transaction.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-feeding-transaction-container',
  template: `
    <app-feeding-transaction
      [currentAnimal]="selectedAnimal$ | async"
      [feedingTransactions]="feedingTransactions$ | async"
      [feedTypes]="feedTypes$ | async"
      [units]="units$ | async"
      [pageNumber]="pageNumber$ | async"
      [pageSize]="pageSize$ | async"
      [recordCount]="recordCount$ | async"
      (add)="onAddTransaction($event)"
      (delete)="onDelete($event)"
      (page)="onPage($event)"
    ></app-feeding-transaction>
  `
})
export class FeedingTransactionContainerComponent implements OnDestroy {
  public selectedAnimal$: Observable<Animal> = EMPTY;
  public feedingTransactions$: Observable<FeedingTransaction[]> = EMPTY;
  public feedTypes$: Observable<FeedType[]> = EMPTY;
  public units$: Observable<Unit[]> = EMPTY;
  public pageNumber$: Observable<number> = EMPTY;
  public pageSize$: Observable<number> = EMPTY;
  public recordCount$: Observable<number> = EMPTY;

  private _pageEvent = new Subject<PageEvent>();
  private _destroyed$ = new Subject<void>();

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(
      new FetchFeedTypesAction(0, environment.pageSize, true)
    );

    this.selectedAnimal$ = this.store.pipe(
      select(getSelectedAnimal),
      filter((animal: Animal) => animal !== null && animal !== undefined),
      tap((animal: Animal) => {
        this.store.dispatch(
          new FetchFeedingTransactions(animal.id, 0, environment.pageSize)
        );
      }),
      takeUntil(this._destroyed$)
    );

    this.feedingTransactions$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getAllFeedingTransactions),
      takeUntil(this._destroyed$)
    );
    this.feedTypes$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypes),
      takeUntil(this._destroyed$)
    );
    this.units$ = this.store.pipe(
      select(getUnits),
      takeUntil(this._destroyed$)
    );
    this.pageNumber$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getCurrentPage),
      takeUntil(this._destroyed$)
    );
    this.pageSize$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getPageSize),
      takeUntil(this._destroyed$)
    );
    this.recordCount$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getRecordCount),
      takeUntil(this._destroyed$)
    );

    combineLatest([this.selectedAnimal$, this._pageEvent])
      .pipe(takeUntil(this._destroyed$))
      .subscribe(([selectedAnimal, pageEvent]: [Animal, PageEvent]) => {
        this.store.dispatch(
          new FetchFeedingTransactions(
            selectedAnimal.id,
            pageEvent.pageIndex,
            pageEvent.pageSize
          )
        );
      });
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onAddTransaction(animalId: number) {
    this.router.navigate(['/feeding-transaction', animalId, 'new']);
  }

  public onShowDetail(identifier: FeedingTransaction) {
    this.store.dispatch(new SelectFeedTransactionAction(identifier.id));
    this.router.navigate([
      '/feeding-transaction',
      identifier.animalId,
      identifier.id,
      'edit'
    ]);
  }

  public onDelete(id: number) {
    this.store.dispatch(actions.deleteItem(id));
  }

  public onPage(pageEvent: PageEvent): void {
    this._pageEvent.next(pageEvent);
  }
}
