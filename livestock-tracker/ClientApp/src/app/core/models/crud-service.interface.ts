import { Observable } from 'rxjs';

import { KeyEntity } from './key-entity.interface';

export interface CrudService<
  T extends KeyEntity<K>,
  K,
  TGetAll,
  TFetchSinglePayload
> {
  getAll(): Observable<TGetAll>;
  get(key: TFetchSinglePayload): Observable<T>;
  add(item: T): Observable<T>;
  update(item: T, key: K): Observable<T>;
  delete(key: K): Observable<K>;
}
