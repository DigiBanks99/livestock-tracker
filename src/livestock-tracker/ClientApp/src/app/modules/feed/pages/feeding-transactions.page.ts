import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, NgModule, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Animal, FeedingTransaction, FeedType, Unit } from '@core/models';
import { AppState } from '@core/store';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { environment } from '@env/environment';
import { FeedStore } from '@feed-store';
import { FeedingTransactionsComponentModule } from '@feed/components';
import { FeedStoreModule } from '@feed/store/feed-store.module';
import { select, Store } from '@ngrx/store';

@Component({
  template: `
    <app-feeding-transactions
      [transactions]="transactions$ | async"
      [feedTypes]="feedTypes$ | async"
      [units]="units$ | async"
      [pageNumber]="pageNumber$ | async"
      [pageSize]="pageSize$ | async"
      [recordCount]="recordCount$ | async"
      (addTransaction)="onAddTransaction()"
      (deleteTransaction)="onDelete($event)"
      (pageChanged)="onPage($event)"
    ></app-feeding-transactions>
  `
})
export class FeedingTransactionsPage implements OnDestroy {
  // Data
  public readonly isLoadingTransactions$: Observable<boolean>;
  public readonly feedTypes$: Observable<FeedType[]>;
  public readonly selectedAnimal$: Observable<Animal>;
  public readonly transactions$: Observable<FeedingTransaction[]>;
  public readonly units$: Observable<Unit[]>;
  // Pagination
  public readonly pageNumber$: Observable<number>;
  public readonly pageSize$: Observable<number>;
  public readonly recordCount$: Observable<number>;

  private _animalId: number | null = null;
  private readonly _destroyed$ = new Subject<void>();
  private readonly _pageChanged$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    length: 0,
    pageSize: environment.pageSize
  });

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _router: Router
  ) {
    this.transactions$ = this.setupTransactions();
    this.feedTypes$ = this.setupFeedTypes();
    this.units$ = this.setupUnits();
    this.isLoadingTransactions$ = this.setupLoaderStates();

    this.pageNumber$ = this.setupPageNumber();
    this.pageSize$ = this.setupPageSize();
    this.recordCount$ = this.setupRecordCount();

    this.setupTransactionFetch();
    this.setupAnimalId();
  }

  public ngOnDestroy(): void {
    this._pageChanged$.complete();

    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onAddTransaction() {
    this._router.navigate(['feed', this._animalId, 'new']);
  }

  public onDelete(id: number) {
    this._store.dispatch(FeedStore.Transactions.actions.deleteItem(id));
  }

  public onPage(pageEvent: PageEvent): void {
    this._pageChanged$.next(pageEvent);
  }

  private setupAnimalId(): void {
    this._store
      .pipe(select(getSelectedAnimalId), takeUntil(this._destroyed$))
      .subscribe((animalId: number) => (this._animalId = animalId));
  }

  private setupTransactionFetch(): void {
    this._pageChanged$
      .asObservable()
      .pipe(takeUntil(this._destroyed$))
      .subscribe((pageEvent: PageEvent) => {
        this._store.dispatch(
          FeedStore.Transactions.actions.fetchAnimalTransactions(
            pageEvent.pageIndex,
            pageEvent.pageSize
          )
        );
      });
  }

  private setupTransactions(): Observable<FeedingTransaction[]> {
    return this._store.pipe(
      select(FeedStore.Transactions.selectors.feedingTransactionsForAnimal),
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

  private setupLoaderStates(): Observable<boolean> {
    return this._store.pipe(
      select(FeedStore.Transactions.selectors.isFetching),
      takeUntil(this._destroyed$)
    );
  }

  private setupPageNumber(): Observable<number> {
    return this._store.pipe(
      select(FeedStore.Transactions.selectors.currentPage),
      takeUntil(this._destroyed$)
    );
  }

  private setupPageSize(): Observable<number> {
    return this._store.pipe(
      select(FeedStore.Transactions.selectors.pageSize),
      takeUntil(this._destroyed$)
    );
  }

  private setupRecordCount(): Observable<number> {
    return this._store.pipe(
      select(FeedStore.Transactions.selectors.recordCount),
      takeUntil(this._destroyed$)
    );
  }
}

@NgModule({
  declarations: [FeedingTransactionsPage],
  exports: [FeedingTransactionsPage],
  imports: [CommonModule, FeedingTransactionsComponentModule, FeedStoreModule]
})
export class FeedingTransactionsPageModule {}
