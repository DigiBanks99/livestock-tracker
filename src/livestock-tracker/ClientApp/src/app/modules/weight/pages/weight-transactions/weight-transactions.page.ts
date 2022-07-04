import {
  BehaviorSubject,
  Observable,
  Subject
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  Component,
  OnDestroy
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AnimalState } from '@core/store';
import { getSelectedAnimalId } from '@core/store/selectors';
import { environment } from '@env/environment';
import {
  select,
  Store
} from '@ngrx/store';
import {
  WeightState,
  WeightTransaction
} from '@weight/interfaces';
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
  public readonly isLoadingTransactions$: Observable<boolean>;
  public readonly pageNumber$: Observable<number>;
  public readonly pageSize$: Observable<number>;
  public readonly recordCount$: Observable<number>;
  public readonly transactions$: Observable<WeightTransaction[]>;

  private _animalId: number | null = null;
  private readonly _pageChanged$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    length: 0,
    pageSize: environment.pageSize
  });
  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly _animalStore: Store<AnimalState>,
    private readonly _weightStore: Store<WeightState>,
    private readonly _router: Router
  ) {
    this.isLoadingTransactions$ = this.setupLoaderStates();
    this.transactions$ = this.setupTransactions();

    this.pageNumber$ = this.setupPageNumber();
    this.pageSize$ = this.setupPageSize();
    this.recordCount$ = this.setupRecordCount();

    this.setupTransactionFetch();
    this.setupAnimalId();
  }

  public onAddTransaction(): void {
    this._router.navigate(['weight', this._animalId, 'new']);
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

  private setupLoaderStates(): Observable<boolean> {
    return this._weightStore.pipe(
      select(WeightStore.selectors.isFetching),
      takeUntil(this._destroyed$)
    );
  }

  private setupAnimalId(): void {
    this._animalStore
      .pipe(select(getSelectedAnimalId), takeUntil(this._destroyed$))
      .subscribe((animalId: number) => (this._animalId = animalId));
  }

  private setupTransactionFetch(): void {
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

  private setupTransactions(): Observable<WeightTransaction[]> {
    return this._weightStore.pipe(
      select(WeightStore.selectors.weightTransactionsForAnimal),
      takeUntil(this._destroyed$)
    );
  }

  private setupRecordCount(): Observable<number> {
    return this._weightStore.pipe(
      select(WeightStore.selectors.recordCount),
      takeUntil(this._destroyed$)
    );
  }

  private setupPageSize(): Observable<number> {
    return this._weightStore.pipe(
      select(WeightStore.selectors.pageSize),
      takeUntil(this._destroyed$)
    );
  }

  private setupPageNumber(): Observable<number> {
    return this._weightStore.pipe(
      select(WeightStore.selectors.currentPage),
      takeUntil(this._destroyed$)
    );
  }
}
