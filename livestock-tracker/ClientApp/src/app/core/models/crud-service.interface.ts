import { Observable } from 'rxjs';

import { KeyEntity } from './key-entity.interface';
import { PagedData } from './paged-data.model';

export interface CrudService<
  TData extends KeyEntity<TKey>,
  TKey,
  TFetchSinglePayload
> {
  getAll(): Observable<PagedData<TData>>;
  get(key: TFetchSinglePayload): Observable<TData>;
  add(item: TData): Observable<TData>;
  update(item: TData, key: TKey): Observable<TData>;
  delete(key: TKey): Observable<TKey>;
}
