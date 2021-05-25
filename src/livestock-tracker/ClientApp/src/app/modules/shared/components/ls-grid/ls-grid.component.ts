import { Observable, Subscription } from 'rxjs';

import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Params } from '@angular/router';
import { KeyEntity } from '@core/models/key-entity.interface';
import { LsGridColumnDef } from '@core/models/ls-grid-column-def.model';
import { LsGridConfig } from '@core/models/ls-grid-config.model';
import { LsGridColumnType } from '@shared/components/ls-grid/ls-grid-column-type.enum';

@Component({
  selector: 'app-ls-grid',
  templateUrl: './ls-grid.component.html',
  styleUrls: ['./ls-grid.component.scss']
})
export class LsGridComponent implements OnChanges, OnDestroy {
  @Input() public config: LsGridConfig<
    KeyEntity<string | number>,
    string | number
  >;
  @Input() dataSource?: any[];

  private dataChanged: Subscription;
  private data: any[];
  private loading: boolean;

  constructor() {
    this.dataChanged = new Subscription();
    this.data = [];
    this.loading = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource && changes.dataSource.currentValue)
      this.data = this.dataSource;
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

  public setData(data: any) {
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

    if (config.heading === undefined || config.heading === null) {
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

  public getColumnDefIndexes(): number[] {
    const colDefs = this.getColumnDefs();
    return colDefs.map((colDef) => colDefs.indexOf(colDef));
  }

  public getColumnDef(index: number): LsGridColumnDef {
    return this.getColumnDefs()[index] || new LsGridColumnDef();
  }

  public getValueDisplay(item: any, index: number) {
    const colDef = this.getColumnDef(index);
    if (colDef.pipe === undefined || colDef.pipe === null) {
      return item[colDef.field];
    }

    return colDef.pipe(item[colDef.field]);
  }

  public getRouterLink(): Array<string> {
    let routerLink = this.getConfig().routerLink;
    if (routerLink === undefined || routerLink === null) {
      routerLink = ['#'];
    }

    return routerLink;
  }

  public getQueryParams(item: any): Params {
    let paramsFunc = this.getConfig().queryParameters;
    if (typeof paramsFunc !== 'function') {
      paramsFunc = () => null;
    }

    return paramsFunc(item);
  }

  public getRouterLinkActiveClasses(): string[] | string {
    let routerLinkActive = this.getConfig().routerLinkActive;
    if (routerLinkActive === undefined || routerLinkActive === null) {
      routerLinkActive = ['active'];
    }

    return routerLinkActive;
  }

  public getColumnTitle(index: number): string {
    return this.getColumnDef(index).title;
  }

  public getColumnWidth(index: number): string {
    return this.getColumnDef(index).getWidth();
  }

  public ngOnDestroy(): void {
    this.dataChanged.unsubscribe();
  }

  public onClick(item: any) {
    this.getConfig().showDetail.emit(item);
  }

  public onPage(pageEvent: PageEvent) {
    this.callDataFetch(
      this.getConfig().dataService.page(pageEvent.pageSize, pageEvent.pageIndex)
    );
  }

  public onDelete(event: Event, index: number, item: any) {
    this.getColumnDef(index).handleDelete(event, item);
  }

  public reload(): void {
    if (this.dataSource) this.data = this.dataSource;
    else this.fetchData();
  }

  public isDisplayColumn(index: number) {
    return this.getColumnDef(index).type === LsGridColumnType.DisplayOnly;
  }

  public isDeleteColumn(index: number) {
    return this.getColumnDef(index).type === LsGridColumnType.Delete;
  }

  private getConfig(): LsGridConfig<
    KeyEntity<string | number>,
    string | number
  > {
    if (this.config === undefined || this.config === null) {
      throw new Error('ERROR: config not supplied.');
    }

    return this.config;
  }

  private fetchData() {
    this.callDataFetch(
      this.getConfig().dataService.get(this.getConfig().fetchKey)
    );
  }

  private addDataItem(item: any) {
    this.data.push(item);
  }

  private clearData() {
    this.data = [];
  }

  private callDataFetch(observable: Observable<any>): void {
    this.clearData();
    this.setLoadingStatus(true);
    this.dataChanged = observable.subscribe(
      (data: any) => this.setData(data),
      (error) => this.handleError(error),
      () => this.setLoadingStatus(false)
    );
  }

  private handleError(error: any) {
    console.error(error);
  }
}
