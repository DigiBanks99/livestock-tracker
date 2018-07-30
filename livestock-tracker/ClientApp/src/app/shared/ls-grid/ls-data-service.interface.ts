import { Observable } from '../../../../node_modules/rxjs';

export interface ILsDataService {
  get(fetchKey?: any): Observable<Object>;
  page(pageNumber: number, pageSize: number): Observable<Object>;
}
