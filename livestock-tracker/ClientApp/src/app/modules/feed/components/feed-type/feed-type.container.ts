import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedType } from '@core/models/feed-type.model';
import { FeedTypeState } from '@core/store';
import { feedTypeStore } from '@feed-store';
import { actions, SelectFeedType } from '@feed/store/feed-type.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-feed-type-container',
  template: `
    <app-feed-type
      [feedTypes]="feedTypes$ | async"
      (add)="onAdd($event)"
      (remove)="onRemove($event)"
      (save)="onSave($event)"
    ></app-feed-type>
  `
})
export class FeedTypeContainerComponent implements OnInit {
  public feedTypes$: Observable<FeedType[]>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;

  constructor(private store: Store<FeedTypeState>, private router: Router) {
    this.feedTypes$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypes)
    );
    this.isPending$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypePending)
    );
    this.error$ = this.store.pipe(
      select(feedTypeStore.selectors.getFeedTypeError)
    );
  }

  public ngOnInit(): void {
    actions.fetchItems();
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
}
