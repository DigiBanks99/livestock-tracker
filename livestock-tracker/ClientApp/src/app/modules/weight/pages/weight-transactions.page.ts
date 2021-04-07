import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PaginationState } from '@core/store';
import { environment } from '@env/environment';
import { select, Store } from '@ngrx/store';
import { WeightState, WeightTransaction } from '@weight/interfaces';
import { WeightStore } from '@weight/store';

@Component({
  template: `<app-weight-transaction-list
    [isLoadingTransactions]="isLoadingTransactions$ | async"
    [pageNumber]="pageNumber$ | async"
    [pageSize]="pageSize$ | async"
    [recordCount]="recordCount$ | async"
    [transactions]="transactions$ | async"
    (addTransaction)="onAddTransaction()"
    (deleteTransaction)="onDeleteTransaction($event)"
    (pageChanged)="onPageChanged($event)"
  ></app-weight-transaction-list>`
})
export class WeightTransactionsPage implements OnDestroy {
  public isLoadingTransactions$: Observable<boolean>;
  public pageNumber$: Observable<number>;
  public pageSize$: Observable<number>;
  public recordCount$: Observable<number>;
  public transactions$: Observable<WeightTransaction[]>;

  private readonly _pageChanged$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    length: 0,
    pageSize: environment.pageSize
  });
  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly _weightStore: Store<WeightState>,
    private readonly _router: Router
  ) {
    this.setUpLoaderStates();
    this.setUpPaginationState();
    this.setUpTransactionFetch();
    this.setUpTransactions();
  }

  public onAddTransaction(): void {
    this._router.navigateByUrl('new');
  }

  public onDeleteTransaction(transactionId: number): void {
    this._weightStore.dispatch(WeightStore.actions.deleteItem(transactionId));
  }

  public onPageChanged(pageEvent: PageEvent): void {
    this._pageChanged$.next(pageEvent);
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private setUpLoaderStates(): void {
    this.isLoadingTransactions$ = this._weightStore.pipe(
      select(WeightStore.selectors.isFetching),
      takeUntil(this._destroyed$)
    );
  }

  private setUpPaginationState(): void {
    const paginationState$ = this._weightStore.pipe(
      select(WeightStore.selectors.paginationData),
      takeUntil(this._destroyed$)
    );

    this.pageNumber$ = paginationState$.pipe(
      map(
        (paginationState: PaginationState): number => paginationState.pageNumber
      )
    );
    this.pageSize$ = paginationState$.pipe(
      map(
        (paginationState: PaginationState): number => paginationState.pageSize
      )
    );
    this.recordCount$ = paginationState$.pipe(
      map(
        (paginationState: PaginationState): number =>
          paginationState.recordCount
      )
    );
  }

  private setUpTransactionFetch(): void {
    this._pageChanged$
      .asObservable()
      .pipe(takeUntil(this._destroyed$))
      .subscribe((pageEvent: PageEvent) => {
        this._weightStore.dispatch(
          WeightStore.actions.fetchAnimalTransactions(
            pageEvent.pageIndex,
            pageEvent.pageSize
          )
        );
      });
  }

  private setUpTransactions(): void {
    this.transactions$ = this._weightStore.pipe(
      select(WeightStore.selectors.weightTransactionsForAnimal),
      takeUntil(this._destroyed$)
    );
  }
}
