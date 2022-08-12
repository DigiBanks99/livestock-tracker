import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FeedType } from '@core/models/feed-type.model';
import { environment } from '@env/environment';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { CommandButtonComponentModule } from '@shared/components';

import { FeedTypeDetailComponentModule } from './feed-type-detail/feed-type-detail.component';

@Component({
  selector: 'app-feed-type',
  templateUrl: './feed-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedTypeComponent {
  @Input() public feedTypes: FeedType[] = [];
  @Input() public pageNumber = 0;
  @Input() public pageSize: number = environment.pageSize;
  @Input() public recordCount = 0;
  @Output() public readonly add = new EventEmitter<FeedType>();
  @Output() public readonly remove = new EventEmitter<number>();
  @Output() public readonly save = new EventEmitter<FeedType>();
  @Output() public readonly page = new EventEmitter<PageEvent>();

  public readonly displayedColumns: string[] = ['description', 'star'];

  public onAdd(): void {
    this.add.emit({
      id: 0,
      description: 'New'
    });
  }

  public onPage(pageEvent: PageEvent): void {
    this.page.emit(pageEvent);
  }

  public onRemove(id: number): void {
    this.remove.emit(id);
  }

  public onSave(feedType: FeedType): void {
    this.save.emit(feedType);
  }
}

@NgModule({
  declarations: [FeedTypeComponent],
  exports: [FeedTypeComponent],
  imports: [
    CommandButtonComponentModule,
    FeedTypeDetailComponentModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ]
})
export class FeedTypeComponentModule {}
