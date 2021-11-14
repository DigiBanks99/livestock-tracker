import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FeedType } from '@core/models/feed-type.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-feed-type',
  templateUrl: './feed-type.component.html',
  styleUrls: ['./feed-type.component.scss']
})
export class FeedTypeComponent {
  @Input() public feedTypes: FeedType[];
  @Input() public pageNumber: number;
  @Input() public pageSize: number;
  @Input() public recordCount: number;
  @Output() public add = new EventEmitter<FeedType>();
  @Output() public remove = new EventEmitter<number>();
  @Output() public save = new EventEmitter<FeedType>();
  @Output() public page = new EventEmitter<PageEvent>();

  public displayedColumns: string[] = ['description', 'star'];

  constructor() {
    this.feedTypes = [];
    this.pageSize = environment.pageSize;
    this.pageNumber = 0;
    this.recordCount = 0;
  }

  public onAdd(): void {
    this.add.emit({
      id: 0,
      description: 'New'
    });
  }

  public onPage(pageEvent: PageEvent) {
    this.page.emit(pageEvent);
  }

  public onRemove(id: number) {
    this.remove.emit(id);
  }

  public onSave(feedType: FeedType) {
    this.save.emit(feedType);
  }
}
