import { Observable } from 'rxjs';

export interface LsDataService<TType, TKey> {
  getAll(key: TKey): Observable<TType[]>;
  get(key: TKey): Observable<TType>;
  page(pageNumber: number, pageSize: number): Observable<TType>;
}
