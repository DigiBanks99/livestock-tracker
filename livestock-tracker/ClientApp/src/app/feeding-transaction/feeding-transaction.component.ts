import { Component, OnInit, OnDestroy, ViewChild, PipeTransform } from '@angular/core';
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
import { MatSelect, MatSelectChange } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-feeding-transaction',
  templateUrl: './feeding-transaction.component.html',
  styleUrls: ['./feeding-transaction.component.scss']
})
export class FeedingTransactionComponent implements OnInit, OnDestroy {
  private livestockChanged: Subscription;
  private livestockAdded: Subscription;
  private animalSelectorChanged: Subscription;
  private currentAnimal: Livestock;
  private animals: Livestock[];

  public feedingTransactions: FeedingTransaction[];

  @ViewChild('data') dataGrid: LsGridComponent;
  @ViewChild('animalSelector') animalSelector: MatSelect;

  constructor(private feedingTransactionService: FeedingTransactionService, private livestockService: LivestockService) {
    this.livestockChanged = new Subscription();
    this.livestockAdded = new Subscription();
    this.animalSelectorChanged = new Subscription();

    this.feedingTransactions = [];
    const utcNow = moment().utc().toDate();
    this.currentAnimal = new Livestock(-99, LiveStockType.Cattle, null, 0, utcNow, utcNow, 0, 0, 0, 0);
  }

  public ngOnInit(): void {
    this.init();
  }

  public getConfig(): LsGridConfig {
    const config = new LsGridConfig();
    config.dataService = this.feedingTransactionService;
    config.columnDef = this.getGridColumnDefs();
    config.useHeading = false;
    config.fetchKey = this.currentAnimal;
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
    feedingTransaction.transactionDate = moment().utc(false).toDate();
    feedingTransaction.feedID = 1;
    feedingTransaction.quantity = 0;
    feedingTransaction.unitTypeCode = 1;
    this.livestockAdded = this.feedingTransactionService.add(feedingTransaction).subscribe(() => this.dataGrid.reload());
  }

  private init() {
    this.fetchAnimals();
    this.animalSelectorChanged = this.animalSelector.selectionChange
      .subscribe((change: MatSelectChange) => this.animalSelectorValueChanged(change));
  }

  private fetchAnimals() {
    this.animals = [];
    this.livestockChanged = this.livestockService.livestockChanged.subscribe((animals: Livestock[]) => {
      this.animals = animals;
      this.setCurrentAnimal(this.animals[0]);
    });
    this.livestockService.getLivestock();
  }

  private animalSelectorValueChanged(selectChanged: MatSelectChange) {
    this.setCurrentAnimal(this.livestockService.getAnimal(selectChanged.value));
  }

  private getGridColumnDefs(): LsGridColumnDef[] {
    const columnDefs = [];

    const colDef1 = new LsGridColumnDef();
    colDef1.description = 'Animal';
    colDef1.field = 'animalID';
    columnDefs.push(colDef1);

    const colDef2 = new LsGridColumnDef();
    colDef2.description = 'Feed';
    colDef2.field = 'feedID';
    columnDefs.push(colDef2);

    const colDef3 = new LsGridColumnDef();
    colDef3.description = 'Date';
    colDef3.field = 'transactionDate';
    colDef3.pipe = this.getDatePipe;
    columnDefs.push(colDef3);

    const colDef4 = new LsGridColumnDef();
    colDef4.description = 'Quantity';
    colDef4.field = 'quantity';
    columnDefs.push(colDef4);

    const colDef5 = new LsGridColumnDef();
    colDef5.description = 'Unit';
    colDef5.field = 'unitTypeCode';
    columnDefs.push(colDef5);

    return columnDefs;
  }

  private getDatePipe(item: string): string {
    const date = moment(item);
    return formatDate(item, 'medium', date.locale(), date.zoneName());
  }

  private setCurrentAnimal(animal: Livestock): void {
    if (animal.id === -99 || animal.id === this.currentAnimal.id) {
      return;
    }

    this.currentAnimal = animal;
    this.dataGrid.config.fetchKey = animal.id;
    this.dataGrid.reload();
  }

  public ngOnDestroy(): void {
    this.livestockChanged.unsubscribe();
    this.livestockAdded.unsubscribe();
    this.animalSelectorChanged.unsubscribe();
  }
}
