import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription, Observable } from '../../../../node_modules/rxjs';
import { isNullOrUndefined } from 'util';
import { LsGridConfig } from './ls-grid-config.model';
import { LsGridColumnDef } from './ls-grid-column-def.model';

@Component({
  selector: 'app-ls-grid',
  templateUrl: './ls-grid.component.html',
  styleUrls: ['./ls-grid.component.scss']
})
export class LsGridComponent implements OnInit, OnDestroy {
  private dataChanged: Subscription;
  private data: any[];
  private loading: boolean;

  @Input() public config: LsGridConfig;

  constructor() {
    this.dataChanged = new Subscription();
    this.data = [];
    this.loading = false;
  }

  public ngOnInit(): void {
    this.init();
  }

  public getLoadingStatus() {
    return this.loading;
  }

  public setLoadingStatus(status: boolean) {
    this.loading = status;
  }

  public getData(): any[] {
    return this.data;
  }

  public setData(data: Object) {
    if (!Array.isArray(data)) {
      this.addDataItem(data);
    } else {
      for (const item of <any[]>data) {
        this.addDataItem(item);
      }
    }
  }

  public isHeadingVisible(): boolean {
    return this.getConfig().useHeading;
  }

  public getHeading(): string {
    const config = this.getConfig();

    if (isNullOrUndefined(config.heading)) {
      return 'Data';
    }

    return config.heading;
  }

  public getPageSize(): number {
    return this.getConfig().pageSize;
  }

  public getDataLength(): number {
    return this.data.length;
  }

  public getColumnDefs(): LsGridColumnDef[] {
    return this.getConfig().columnDef;
  }

  public getValueDisplay(item: any, colDef: LsGridColumnDef) {
    if (isNullOrUndefined(colDef.pipe)) {
      return item[colDef.field];
    }

    return colDef.pipe(item[colDef.field]);
  }

  public onPage(pageEvent: PageEvent) {
    this.callDataFetch(this.getConfig().dataService.page(pageEvent.pageSize, pageEvent.pageIndex));
  }

  public reload(): void {
    this.fetchData();
  }

  private getConfig(): LsGridConfig {
    if (isNullOrUndefined(this.config)) {
      throw new Error('ERROR: config not supplied.');
    }

    return this.config;
  }

  private init() {
    this.fetchData();
  }

  private fetchData() {
    this.callDataFetch(this.getConfig().dataService.get(this.getConfig().fetchKey));
  }

  private addDataItem(item: any) {
    this.data.push(item);
  }

  private clearData() {
    this.data = [];
  }

  private callDataFetch(observable: Observable<Object>): void {
    this.clearData();
    this.setLoadingStatus(true);
    this.dataChanged = observable.subscribe(
      (data: Object) => this.setData(data),
      (error) => this.handleError(error),
      () => this.setLoadingStatus(false));
  }

  private handleError(error: any) {
    console.error(error);
  }

  public ngOnDestroy(): void {
    this.dataChanged.unsubscribe();
  }
}
