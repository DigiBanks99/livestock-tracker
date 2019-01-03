import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { PageEvent } from '@angular/material';
import { Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { isNullOrUndefined, isFunction } from 'util';
import { LsGridConfig } from '@shared/ls-grid/ls-grid-config.model';
import { LsGridColumnDef } from '@shared/ls-grid/ls-grid-column-def.model';
import { LsGridColumnType } from '@shared/ls-grid/ls-grid-column-type.enum';

@Component({
  selector: 'app-ls-grid',
  templateUrl: './ls-grid.component.html',
  styleUrls: ['./ls-grid.component.scss']
})
export class LsGridComponent implements OnInit, OnChanges, OnDestroy {
  private dataChanged: Subscription;
  private data: any[];
  private loading: boolean;

  @Input() public config: LsGridConfig;
  @Input() dataSource?: any[];

  constructor() {
    this.dataChanged = new Subscription();
    this.data = [];
    this.loading = false;
  }

  public ngOnInit(): void {}

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

  public getColumnDefIndexes(): Array<Object> {
    const colDefs = this.getColumnDefs();
    return colDefs.map(colDef => colDefs.indexOf(colDef));
  }

  public getColumnDef(index: number): LsGridColumnDef {
    return this.getColumnDefs()[index] || new LsGridColumnDef();
  }

  public getValueDisplay(item: any, index: number) {
    const colDef = this.getColumnDef(index);
    if (isNullOrUndefined(colDef.pipe)) {
      return item[colDef.field];
    }

    return colDef.pipe(item[colDef.field]);
  }

  public getRouterLink(): Array<string> {
    let routerLink = this.getConfig().routerLink;
    if (isNullOrUndefined(routerLink)) {
      routerLink = ['#'];
    }

    return routerLink;
  }

  public getQueryParams(item: any): Params {
    let paramsFunc = this.getConfig().queryParameters;
    if (!isFunction(paramsFunc)) {
      paramsFunc = () => {};
    }

    return paramsFunc(item);
  }

  public getRouterLinkActiveClasses(): string[] | string {
    let routerLinkActive = this.getConfig().routerLinkActive;
    if (isNullOrUndefined(routerLinkActive)) {
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

  private getConfig(): LsGridConfig {
    if (isNullOrUndefined(this.config)) {
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

  private callDataFetch(observable: Observable<Object>): void {
    this.clearData();
    this.setLoadingStatus(true);
    this.dataChanged = observable.subscribe(
      (data: Object) => this.setData(data),
      error => this.handleError(error),
      () => this.setLoadingStatus(false)
    );
  }

  private handleError(error: any) {
    console.error(error);
  }

  public ngOnDestroy(): void {
    this.dataChanged.unsubscribe();
  }
}
