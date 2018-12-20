import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  OnChanges
} from '@angular/core';
import { FeedingTransactionService } from './feeding-transaction.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { FeedingTransaction } from './feeding-transaction.model';
import { LsGridComponent } from '../shared/ls-grid/ls-grid.component';
import { LsGridConfig } from '../shared/ls-grid/ls-grid-config.model';
import { LsGridColumnDef } from '../shared/ls-grid/ls-grid-column-def.model';
import { formatDate } from '../../../node_modules/@angular/common';
import { Livestock } from '../livestock/livestock.model';
import { LiveStockType } from '../livestock/livestock-type.model';
import { LivestockService } from '../livestock/livestock.service';
import {
  MatSelect,
  MatSelectChange
} from '../../../node_modules/@angular/material';
import { FeedTypeService } from '../feed-type/feed-type.service';
import { FeedType } from '../feed-type/feed-type.model';
import { isNullOrUndefined } from 'util';
import { UnitService } from '../unit/unit.service';
import { Unit } from '../unit/unit.model';
import { LsGridColumnType } from '../shared/ls-grid/ls-grid-column-type.enum';

@Component({
  selector: 'app-feeding-transaction',
  templateUrl: './feeding-transaction.component.html',
  styleUrls: ['./feeding-transaction.component.scss']
})
export class FeedingTransactionComponent
  implements OnInit, OnChanges, OnDestroy {
  private livestockChanged: Subscription;
  private livestockAdded: Subscription;
  private animalSelectorChanged: Subscription;
  private feedTypesChanged: Subscription;
  private unitTypesChanged: Subscription;

  @Input() public currentAnimal: Livestock;
  private animals: Livestock[];
  private feedTypes: FeedType[];
  private unitTypes: Unit[];

  public feedingTransactions: FeedingTransaction[];

  @ViewChild('data') dataGrid: LsGridComponent;
  @ViewChild('animalSelector') animalSelector: MatSelect;

  constructor(
    private feedingTransactionService: FeedingTransactionService,
    private livestockService: LivestockService,
    private feedTypeService: FeedTypeService,
    private unitService: UnitService
  ) {
    this.livestockChanged = new Subscription();
    this.livestockAdded = new Subscription();
    this.animalSelectorChanged = new Subscription();
    this.feedTypesChanged = new Subscription();
    this.unitTypesChanged = new Subscription();

    this.feedingTransactions = [];
    this.feedTypes = [];
    this.unitTypes = [];
    const utcNow = moment()
      .utc()
      .toDate();
    this.currentAnimal = new Livestock(
      -99,
      LiveStockType.Cattle,
      null,
      0,
      utcNow,
      utcNow,
      0,
      0,
      0,
      0
    );
  }

  public ngOnInit(): void {
    this.init();
  }

  public ngOnChanges() {
    this.feedingTransactionService.get(this.currentAnimal.id);
    this.dataGrid.config.fetchKey = this.currentAnimal.id;
    this.dataGrid.reload();
  }

  public getConfig(): LsGridConfig {
    const config = new LsGridConfig();
    config.dataService = this.feedingTransactionService;
    config.columnDef = this.getGridColumnDefs();
    config.useHeading = false;
    config.fetchKey = this.currentAnimal.id;
    config.routerLink = ['edit'];
    config.queryParameters = (item: FeedingTransaction) => ({ id: item.id });
    return config;
  }

  public getAnimals(): Livestock[] {
    return this.animals;
  }

  public getCurrentAnimal(): Livestock {
    return this.currentAnimal;
  }

  public getSvgIcon(animal: Livestock) {
    return this.livestockService.getSvgIcon(animal);
  }

  public add(animal: Livestock): void {
    this.dataGrid.config.fetchKey = animal.id;
    const feedingTransaction = new FeedingTransaction();
    feedingTransaction.animalID = animal.id;
    feedingTransaction.transactionDate = moment()
      .utc(false)
      .toDate();
    feedingTransaction.feedID = 1;
    feedingTransaction.quantity = 0;
    feedingTransaction.unitTypeCode = 1;
    this.livestockAdded = this.feedingTransactionService
      .add(feedingTransaction)
      .subscribe(() => this.dataGrid.reload());
  }

  public delete(feedingTransaction: FeedingTransaction) {
    this.feedingTransactionService
      .delete(feedingTransaction)
      .subscribe(() => this.dataGrid.reload());
  }

  private init() {
    this.fetchAnimals();
    this.fetchFeedTypes();
    this.fetchUnitTypes();
    this.animalSelectorChanged = this.animalSelector.selectionChange.subscribe(
      (change: MatSelectChange) => this.animalSelectorValueChanged(change)
    );
  }

  private fetchAnimals() {
    this.animals = [];
    this.livestockChanged = this.livestockService.livestockChanged.subscribe(
      (animals: Livestock[]) => {
        this.animals = animals;
        this.setCurrentAnimal(this.animals[0]);
      }
    );
    this.livestockService.getLivestock();
  }

  private fetchFeedTypes() {
    this.feedTypeService.getFeedTypes();
    this.feedTypesChanged = this.feedTypeService.feedTypesChanged.subscribe(
      (feedTypes: FeedType[]) => {
        this.feedTypes = feedTypes.slice();
      }
    );
  }

  private fetchUnitTypes() {
    this.unitService.getUnits();
    this.unitTypesChanged = this.unitService.unitsChanged.subscribe(
      (units: Unit[]) => {
        this.unitTypes = units.slice();
      }
    );
  }

  private animalSelectorValueChanged(selectChanged: MatSelectChange) {
    this.setCurrentAnimal(this.livestockService.getAnimal(selectChanged.value));
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
    if (isNullOrUndefined(this.feedTypes)) {
      this.feedTypes = [];
    }

    const foundType = this.feedTypes.find(feedType => feedType.id === id);
    if (isNullOrUndefined(foundType)) {
      return '';
    }

    return foundType.description;
  }

  private getUnitPipe(id: number): string {
    if (isNullOrUndefined(this.unitTypes)) {
      this.unitTypes = [];
    }

    const foundType = this.unitTypes.find(unit => unit.typeCode === id);
    if (isNullOrUndefined(foundType)) {
      return '';
    }

    return foundType.description;
  }

  private setCurrentAnimal(animal: Livestock): void {
    this.dataGrid.config.fetchKey = animal.id;
    this.dataGrid.reload();
  }

  public ngOnDestroy(): void {
    this.livestockChanged.unsubscribe();
    this.livestockAdded.unsubscribe();
    this.animalSelectorChanged.unsubscribe();
    this.feedTypesChanged.unsubscribe();
    this.unitTypesChanged.unsubscribe();
  }
}
