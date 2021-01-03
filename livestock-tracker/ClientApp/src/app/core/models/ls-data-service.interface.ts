import { Observable } from 'rxjs';

export interface ILsDataService<T, K> {
  getAll(key: K): Observable<T[]>;
  get(key: K): Observable<T>;
  page(pageNumber: number, pageSize: number): Observable<T>;
}
