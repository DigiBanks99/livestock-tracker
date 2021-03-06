import { Subject } from 'rxjs';

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Animal } from '@core/models/livestock.model';
import { Unit } from '@core/models/unit.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-feeding-transaction',
  templateUrl: './feeding-transaction.component.html',
  styleUrls: ['./feeding-transaction.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.medium }
  ]
})
export class FeedingTransactionComponent implements OnDestroy {
  private destroyed$ = new Subject<void>();

  @Input() public currentAnimal: Animal;
  @Input() public feedingTransactions: FeedingTransaction[];
  @Input() public feedTypes: FeedType[];
  @Input() public units: Unit[];
  @Input() public pageNumber = 0;
  @Input() public pageSize = 100;
  @Input() public recordCount: number;
  @Output() public add = new EventEmitter<number>();
  @Output() public delete = new EventEmitter<number>();
  @Output() public page = new EventEmitter<PageEvent>();

  @ViewChild('animalSelector', { static: false })
  public animalSelector: MatSelect;

  public displayedColumns: string[] = [
    'feedType',
    'date',
    'quantity',
    'unit',
    'star'
  ];

  constructor() {
    this.feedingTransactions = [];
  }

  public getCurrentAnimal(): Animal {
    return this.currentAnimal;
  }

  public onAdd(): void {
    this.add.emit(this.currentAnimal.id);
  }

  public onDelete(id: number) {
    this.delete.emit(id);
  }

  public onPage(page: PageEvent) {
    this.page.emit(page);
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
