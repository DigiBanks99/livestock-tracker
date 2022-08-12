import {
  Observable,
  Subject
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  OnDestroy
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FeedType } from '@core/models/feed-type.model';
import { FeedTypeState } from '@core/store';
import { FeedStore } from '@feed-store';
import { FeedTypeComponentModule } from '@feed/components';
import { FetchFeedTypesAction } from '@feed/store/feed-type.actions';
import {
  select,
  Store
} from '@ngrx/store';

@Component({
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
  `
})
export class FeedTypePage implements OnDestroy {
  public feedTypes$: Observable<FeedType[]>;
  public isPending$: Observable<boolean>;
  public currentPage$: Observable<number>;
  public pageSize$: Observable<number>;
  public recordCount$: Observable<number>;

  private destroyed$ = new Subject<void>();

  constructor(private store: Store<FeedTypeState>) {
    this.store.dispatch(FeedStore.Feed.actions.fetchItems());

    this.feedTypes$ = this.store.pipe(
      select(FeedStore.Feed.selectors.getFeedTypes),
      takeUntil(this.destroyed$)
    );
    this.isPending$ = this.store.pipe(
      select(FeedStore.Feed.selectors.getFeedTypePending),
      takeUntil(this.destroyed$)
    );

    this.pageSize$ = this.store.pipe(
      select(FeedStore.Feed.selectors.getPageSize),
      takeUntil(this.destroyed$)
    );
    this.currentPage$ = this.store.pipe(
      select(FeedStore.Feed.selectors.getCurrentPage),
      takeUntil(this.destroyed$)
    );
    this.recordCount$ = this.store.pipe(
      select(FeedStore.Feed.selectors.getRecordCount),
      takeUntil(this.destroyed$)
    );
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onAdd(feedType: FeedType) {
    this.store.dispatch(FeedStore.Feed.actions.addItem(feedType));
  }

  public onRemove(id: number) {
    this.store.dispatch(FeedStore.Feed.actions.deleteItem(id));
  }

  public onSave(feedType: FeedType) {
    this.store.dispatch(
      FeedStore.Feed.actions.updateItem(feedType, feedType.id)
    );
  }

  public onPage(pageEvent: PageEvent) {
    this.store.dispatch(
      new FetchFeedTypesAction(pageEvent.pageIndex, pageEvent.pageSize)
    );
  }
}

@NgModule({
  declarations: [FeedTypePage],
  exports: [FeedTypePage],
  imports: [CommonModule, FeedTypeComponentModule]
})
export class FeedTypePageModule {}
