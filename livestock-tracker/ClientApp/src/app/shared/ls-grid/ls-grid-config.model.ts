import { LsGridColumnDef } from './ls-grid-column-def.model';
import { ILsDataService } from './ls-data-service.interface';

export class LsGridConfig {
  columnDef: LsGridColumnDef[];
  dataService: ILsDataService;
  fetchKey?: any;
  useHeading?: boolean;
  heading?: string;
  pageSize?: number;
  pageNumber?: number;

  constructor() {
    this.useHeading = false;
    this.heading = null;
    this.columnDef = [];
    this.dataService = null;
    this.fetchKey = null;
    this.pageNumber = 1;
    this.pageSize = 20;
  }
}
