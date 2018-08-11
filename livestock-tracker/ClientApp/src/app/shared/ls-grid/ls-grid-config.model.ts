import { LsGridColumnDef } from './ls-grid-column-def.model';
import { ILsDataService } from './ls-data-service.interface';
import { Params } from '../../../../node_modules/@angular/router';

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
    this.routerLinkActive = ['active'];
  }
}
