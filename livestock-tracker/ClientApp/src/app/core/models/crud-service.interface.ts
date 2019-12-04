import { Observable } from 'rxjs';

import { KeyEntity } from './key-entity.interface';

export interface CrudService<T extends KeyEntity<K>, K> {
  getAll(): Observable<T[]>;
  get(key: K): Observable<T>;
  add(item: T): Observable<T>;
  update(item: T, key: K): Observable<T>;
  delete(key: K): Observable<K>;
}
