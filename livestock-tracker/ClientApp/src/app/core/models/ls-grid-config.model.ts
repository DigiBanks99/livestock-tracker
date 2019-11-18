import { EventEmitter } from '@angular/core';
import { ILsDataService } from '@core/models/ls-data-service.interface';
import { LsGridColumnDef } from '@core/models/ls-grid-column-def.model';

export class LsGridConfig {
  columnDef: LsGridColumnDef[];
  dataService: ILsDataService;
  fetchKey?: any;
  useHeading?: boolean;
  heading?: string;
  pageSize?: number;
  pageNumber?: number;
  routerLink?: Array<string>;
  queryParameters?: Function;
  showDetail: EventEmitter<any>;
  routerLinkActive?: string[] | string;

  constructor() {
    this.useHeading = false;
    this.heading = null;
    this.columnDef = [];
    this.dataService = null;
    this.fetchKey = null;
    this.pageNumber = 1;
    this.pageSize = 20;
    this.routerLink = ['#'];
    this.queryParameters = () => {};
    this.showDetail = new EventEmitter<any>();
    this.routerLinkActive = ['active'];
  }
}
