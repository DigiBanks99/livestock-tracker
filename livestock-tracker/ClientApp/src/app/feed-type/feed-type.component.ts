import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { FeedType } from './feed-type.model';
import { FeedTypeService } from './feed-type.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-feed-type',
  templateUrl: './feed-type.component.html',
  styleUrls: ['./feed-type.component.scss']
})
export class FeedTypeComponent implements OnInit, OnDestroy {

  public feedTypes: FeedType[];
  public filteredFeedTypes: FeedType[];
  public pageSize: number;
  public lastPage: number;

  constructor(private feedTypeService: FeedTypeService) {
    this.feedTypes = [];
    this.filteredFeedTypes = [];
    this.pageSize = environment.pageSize;
    this.lastPage = environment.defaultLastPage;
    this.feedTypesChangedSubscription = new Subscription();
  }

  private feedTypesChangedSubscription: Subscription;

  ngOnInit() {
    this.feedTypesChangedSubscription = this.feedTypeService.feedTypesChanged.subscribe((feedTypes: FeedType[]) => {
      this.feedTypes = feedTypes;
      if (this.feedTypes.length <= this.pageSize) {
        this.lastPage = 0;
      }

      this.filterList(this.pageSize, this.lastPage);
    });
    this.feedTypeService.getFeedTypes();
  }

  public addFeedType() {
    const newFeedType = new FeedType();
    newFeedType.description = 'New';
    this.feedTypeService.add(newFeedType);
  }

  public onPage(pageEvent: PageEvent) {
    this.lastPage = pageEvent.pageIndex;
    this.filterList(pageEvent.pageSize, pageEvent.pageIndex);
  }

  private filterList(pageSize: number, pageIndex: number) {
    this.filteredFeedTypes.splice(0);
    const startIndex = pageSize * pageIndex;
    for (let i = startIndex; i < startIndex + pageSize; i++) {
      // if we passed the last item, let's not continue
      if (i >= this.feedTypes.length) {
        return;
      }
      this.filteredFeedTypes.push(this.feedTypes[i]);
    }
  }

  ngOnDestroy() {
    this.feedTypesChangedSubscription.unsubscribe();
  }
}
