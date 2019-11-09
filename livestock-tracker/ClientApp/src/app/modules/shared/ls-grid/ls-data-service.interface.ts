import { Observable } from 'rxjs';

export interface ILsDataService {
  get(fetchKey?: any): Observable<Object>;
  page(pageNumber: number, pageSize: number): Observable<Object>;
}
