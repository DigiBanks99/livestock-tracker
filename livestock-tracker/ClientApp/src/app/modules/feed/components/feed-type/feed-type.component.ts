import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FeedType } from '@core/models/feed-type.model';
import { environment } from '@env/environment';
import { FeedTypeService } from '@feed/services/feed-type.service';

@Component({
  selector: 'app-feed-type',
  templateUrl: './feed-type.component.html',
  styleUrls: ['./feed-type.component.scss']
})
export class FeedTypeComponent implements OnInit {
  @Input() public feedTypes: FeedType[];
  @Output() public add = new EventEmitter<FeedType>();
  @Output() public remove = new EventEmitter<number>();
  @Output() public save = new EventEmitter<FeedType>();

  public filteredFeedTypes: FeedType[];
  public pageSize: number;
  public lastPage: number;

  constructor(private feedTypeService: FeedTypeService) {
    this.feedTypes = [];
    this.filteredFeedTypes = [];
    this.pageSize = environment.pageSize;
    this.lastPage = environment.defaultLastPage;
  }

  ngOnInit() {
    this.feedTypeService.getFeedTypes();
  }

  public addFeedType() {
    const newFeedType = new FeedType();
    newFeedType.description = 'New';
    this.add.emit(newFeedType);
  }

  public onPage(pageEvent: PageEvent) {
    this.lastPage = pageEvent.pageIndex;
    this.filterList(pageEvent.pageSize, pageEvent.pageIndex);
  }

  public onRemove(id: number) {
    this.remove.emit(id);
  }

  public onSave(feedType: FeedType) {
    this.save.emit(feedType);
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
}
