import { Action } from '@ngrx/store';

export interface PaginationAction extends Action {
  pageNumber: number;
  pageSize: number;
}
