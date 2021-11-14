import { Observable } from 'rxjs';

export interface LsDataService<TType, TKey> {
  getAll(key: TKey): Observable<TType[]>;
  get(key: TKey): Observable<TType>;
  page(pageNumber: number, pageSize: number): Observable<TType>;
}

export class NullLsDataService<TType, TKey>
  implements LsDataService<TType, TKey> {
  getAll(key: TKey): Observable<TType[]> {
    throw new Error('Method not implemented.');
  }
  get(key: TKey): Observable<TType> {
    throw new Error('Method not implemented.');
  }
  page(pageNumber: number, pageSize: number): Observable<TType> {
    throw new Error('Method not implemented.');
  }
}
