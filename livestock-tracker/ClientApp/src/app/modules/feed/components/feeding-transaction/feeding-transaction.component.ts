import * as moment from 'moment';
import { Subscription } from 'rxjs';

import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Livestock } from '@core/models/livestock.model';
import { LsGridColumnDef } from '@core/models/ls-grid-column-def.model';
import { LsGridConfig } from '@core/models/ls-grid-config.model';
import { Unit } from '@core/models/unit.model';
import { environment } from '@env/environment';
import { FeedingTransactionService } from '@feed/services/feeding-transaction.service';
import { LsGridColumnType } from '@shared/components/ls-grid/ls-grid-column-type.enum';
import { LsGridComponent } from '@shared/components/ls-grid/ls-grid.component';

@Component({
  selector: 'app-feeding-transaction',
  templateUrl: './feeding-transaction.component.html',
  styleUrls: ['./feeding-transaction.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.medium }
  ]
})
export class FeedingTransactionComponent implements OnDestroy {
  private showDetailTriggered: Subscription;

  @Input() public currentAnimal: Livestock;
  @Input() public feedingTransactions: FeedingTransaction[];
  @Input() public feedTypes: FeedType[];
  @Input() public unitTypes: Unit[];
  @Output() public addTransaction = new EventEmitter<number>();
  @Output() public showDetail = new EventEmitter<FeedingTransaction>();
  @Output() public removeTransaction = new EventEmitter<number>();

  @ViewChild('data', { static: true }) dataGrid: LsGridComponent;
  @ViewChild('animalSelector', { static: false }) animalSelector: MatSelect;

  constructor(private feedingTransactionService: FeedingTransactionService) {
    this.showDetailTriggered = new Subscription();

    this.feedingTransactions = [];
  }

  public getConfig(): LsGridConfig<FeedingTransaction, number> {
    const config = new LsGridConfig<FeedingTransaction, number>();
    config.dataService = this.feedingTransactionService;
    config.columnDef = this.getGridColumnDefs();
    config.useHeading = false;
    config.fetchKey = this.currentAnimal ? this.currentAnimal.id : 0;
    config.routerLink = ['edit'];
    config.queryParameters = (item: FeedingTransaction) => ({ id: item.id });
    this.showDetailTriggered = config.showDetail.subscribe(
      (item: FeedingTransaction) => {
        this.showDetail.emit(item);
      }
    );
    return config;
  }

  public getCurrentAnimal(): Livestock {
    return this.currentAnimal;
  }

  public add(): void {
    this.addTransaction.emit(this.currentAnimal.id);
  }

  public delete(feedingTransaction: FeedingTransaction) {
    this.removeTransaction.emit(feedingTransaction.id);
  }

  private getGridColumnDefs(): LsGridColumnDef[] {
    const columnDefs = [];

    const colDef2 = new LsGridColumnDef();
    colDef2.description = 'Feed';
    colDef2.field = 'feedID';
    colDef2.pipe = (item: any): string => {
      return this.getFeedTypePipe(item);
    };
    columnDefs.push(colDef2);

    const colDef3 = new LsGridColumnDef();
    colDef3.description = 'Date';
    colDef3.field = 'transactionDate';
    colDef3.pipe = (item: any): string => {
      return this.getDatePipe(item);
    };
    columnDefs.push(colDef3);

    const colDef4 = new LsGridColumnDef();
    colDef4.description = 'Quantity';
    colDef4.field = 'quantity';
    colDef4.width = 70;
    columnDefs.push(colDef4);

    const colDef5 = new LsGridColumnDef();
    colDef5.description = 'Unit';
    colDef5.field = 'unitTypeCode';
    colDef5.pipe = (item: any): string => {
      return this.getUnitPipe(item);
    };
    colDef5.width = 50;
    columnDefs.push(colDef5);

    const colDef6 = new LsGridColumnDef();
    colDef6.description = '';
    colDef6.field = 'delete';
    colDef6.width = 25;
    colDef6.type = LsGridColumnType.Delete;
    colDef6.delete = (event: Event, item: FeedingTransaction) => {
      event.stopPropagation();
      event.preventDefault();
      this.delete(item);
    };
    columnDefs.push(colDef6);

    return columnDefs;
  }

  private getDatePipe(item: string): string {
    const date = moment(item);
    return formatDate(item, 'medium', date.locale(), date.zoneName());
  }

  private getFeedTypePipe(id: number): string {
    if (this.feedTypes === undefined || this.feedTypes === null) {
      this.feedTypes = [];
    }

    const foundType = this.feedTypes.find(feedType => feedType.id === id);
    if (foundType === undefined || foundType === null) {
      return '';
    }

    return foundType.description;
  }

  private getUnitPipe(id: number): string {
    if (this.unitTypes === undefined || this.unitTypes === null) {
      this.unitTypes = [];
    }

    const foundType = this.unitTypes.find(unit => unit.typeCode === id);
    if (foundType === undefined || foundType === null) {
      return '';
    }

    return foundType.description;
  }

  public ngOnDestroy(): void {
    this.showDetailTriggered.unsubscribe();
  }
}
