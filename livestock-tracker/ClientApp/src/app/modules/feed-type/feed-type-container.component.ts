import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State, selectors } from '@store';
import { FeedType } from '@core/models/feed-type.model';
import {
  AddFeedType,
  SelectFeedType,
  UpdateFeedType,
  RemoveFeedType
} from '@feed-type-store/actions';

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
export class FeedTypeContainerComponent {
  public feedTypes$: Observable<FeedType[]>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;

  constructor(private store: Store<State>, private router: Router) {
    this.feedTypes$ = this.store.pipe(
      select(selectors.feedTypeSelectors.getFeedTypes)
    );
    this.isPending$ = this.store.pipe(
      select(selectors.feedTypeSelectors.getFeedTypePending)
    );
    this.error$ = this.store.pipe(
      select(selectors.feedTypeSelectors.getFeedTypeError)
    );
  }

  public onAdd(feedType: FeedType) {
    this.store.dispatch(new AddFeedType(feedType));
  }

  public onRemove(id: number) {
    this.store.dispatch(new RemoveFeedType(id));
  }

  public onShowDetail(feedType: FeedType) {
    this.store.dispatch(new SelectFeedType(feedType.id));
    this.router.navigate(['/feedtype', feedType.id, 'edit']);
  }

  public onSave(feedType: FeedType) {
    this.store.dispatch(new UpdateFeedType(feedType));
  }
}
