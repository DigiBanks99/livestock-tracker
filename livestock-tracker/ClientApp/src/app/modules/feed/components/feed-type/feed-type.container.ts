import { EMPTY, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FeedType } from '@core/models/feed-type.model';
import { FeedTypeState } from '@core/store';
import { feedTypeStore } from '@feed-store';
import {
  actions,
  FetchFeedTypes,
  SelectFeedType
} from '@feed/store/feed-type.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-feed-type-container',
  template: `
    <app-feed-type
      [feedTypes]="feedTypes$ | async"
      [pageNumber]="currentPage$ | async"
      [pageSize]="pageSize$ | async"
      [recordCount]="recordCount$ | async"
      (add)="onAdd($event)"
      (remove)="onRemove($event)"
      (save)="onSave($event)"
      (page)="onPage($event)"
    ></app-feed-type>
  `,
})
export class FeedTypeContainerComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  public feedTypes$: Observable<FeedType[]> = EMPTY;
  public isPending$: Observable<boolean> = EMPTY;
  public error$: Observable<Error> = EMPTY;
  public currentPage$: Observable<number> = EMPTY;
  public pageSize$: Observable<number> = EMPTY;
  public recordCount$: Observable<number> = EMPTY;

  constructor(private store: Store<FeedTypeState>, private router: Router) {
    this.feedTypes$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypes),
      takeUntil(this.destroyed$)
    );
    this.isPending$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypePending),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypeError),
      takeUntil(this.destroyed$)
    );

    this.pageSize$ = this.store.pipe(
      select(feedTypeStore.selectors.getPageSize),
      takeUntil(this.destroyed$)
    );
    this.currentPage$ = this.store.pipe(
      select(feedTypeStore.selectors.getCurrentPage),
      takeUntil(this.destroyed$)
    );
    this.recordCount$ = this.store.pipe(
      select(feedTypeStore.selectors.getRecordCount),
      takeUntil(this.destroyed$)
    );
  }

  public ngOnInit(): void {
    this.store.dispatch(new FetchFeedTypes());
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onAdd(feedType: FeedType) {
    this.store.dispatch(actions.addItem(feedType));
  }

  public onRemove(id: number) {
    this.store.dispatch(actions.deleteItem(id));
  }

  public onShowDetail(feedType: FeedType) {
    this.store.dispatch(new SelectFeedType(feedType.id));
    this.router.navigate(['/feedType', feedType.id, 'edit']);
  }

  public onSave(feedType: FeedType) {
    this.store.dispatch(actions.updateItem(feedType, feedType.id));
  }

  public onPage(pageEvent: PageEvent) {
    this.store.dispatch(
      new FetchFeedTypes(pageEvent.pageIndex, pageEvent.pageSize)
    );
  }
}
