import { EMPTY, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Animal, Livestock } from '@core/models/livestock.model';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import { getSelectedAnimal, getUnits } from '@core/store/selectors';
import { environment } from '@env/environment';
import { feedingTransactionStore, feedTypeStore } from '@feed-store';
import { FetchFeedTypes } from '@feed/store/feed-type.actions';
import {
  actions,
  FetchFeedingTransaction as FetchFeedingTransactions,
  SelectFeedTransaction
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
  `,
})
export class FeedingTransactionContainerComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  public selectedAnimal$: Observable<Livestock>;
  public feedingTransactions$: Observable<FeedingTransaction[]>;
  public feedTypes$: Observable<FeedType[]>;
  public units$: Observable<Unit[]>;
  public pageNumber$: Observable<number> = EMPTY;
  public pageSize$: Observable<number> = EMPTY;
  public recordCount$: Observable<number> = EMPTY;

  public selectedAnimal: Animal;

  constructor(private store: Store<AppState>, private router: Router) {
    this.selectedAnimal = null;
  }

  public ngOnInit(): void {
    this.store.dispatch(new FetchFeedTypes(0, environment.pageSize, true));
    this.selectedAnimal$ = this.store.pipe(
      select(getSelectedAnimal),
      filter((animal: Animal) => animal !== null && animal !== undefined),
      tap((animal: Animal) => {
        this.selectedAnimal = animal;
        this.store.dispatch(
          new FetchFeedingTransactions(animal.id, 0, environment.pageSize)
        );
      }),
      takeUntil(this.destroyed$)
    );
    this.feedingTransactions$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getAllFeedingTransactions),
      takeUntil(this.destroyed$)
    );
    this.feedTypes$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypes),
      takeUntil(this.destroyed$)
    );
    this.units$ = this.store.pipe(select(getUnits), takeUntil(this.destroyed$));
    this.pageNumber$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getCurrentPage),
      takeUntil(this.destroyed$)
    );
    this.pageSize$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getPageSize),
      takeUntil(this.destroyed$)
    );
    this.recordCount$ = this.store.pipe(
      select(feedingTransactionStore.selectors.getRecordCount),
      takeUntil(this.destroyed$)
    );
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onAddTransaction(animalId: number) {
    this.router.navigate(['/feeding-transaction', animalId, 'new']);
  }

  public onShowDetail(identifier: FeedingTransaction) {
    this.store.dispatch(new SelectFeedTransaction(identifier.id));
    this.router.navigate([
      '/feeding-transaction',
      identifier.animalId,
      identifier.id,
      'edit',
    ]);
  }

  public onDelete(id: number) {
    this.store.dispatch(actions.deleteItem(id));
  }

  public onPage(pageEvent: PageEvent): void {
    this.store.dispatch(
      new FetchFeedingTransactions(
        this.selectedAnimal.id,
        pageEvent.pageIndex,
        pageEvent.pageSize
      )
    );
  }
}
