import { EventEmitter } from '@angular/core';
import { Params } from '@angular/router';

import { LsDataService, NullLsDataService } from './ls-data-service.interface';
import { LsGridColumnDef } from './ls-grid-column-def.model';

export class LsGridConfig<TType, TKey> {
  columnDef: LsGridColumnDef[];
  dataService: LsDataService<TType, TKey>;
  fetchKey?: TKey | null;
  useHeading?: boolean;
  heading?: string | null;
  pageSize?: number;
  pageNumber?: number;
  routerLink?: Array<string>;
  queryParameters?: (args: any) => Params;
  showDetail: EventEmitter<any>;
  routerLinkActive?: string[] | string;

  constructor() {
    this.useHeading = false;
    this.heading = null;
    this.columnDef = [];
    this.dataService = new NullLsDataService<TType, TKey>();
    this.fetchKey = null;
    this.pageNumber = 1;
    this.pageSize = 20;
    this.routerLink = ['#'];
    this.queryParameters = () => ({});
    this.showDetail = new EventEmitter<any>();
    this.routerLinkActive = ['active'];
  }
}
