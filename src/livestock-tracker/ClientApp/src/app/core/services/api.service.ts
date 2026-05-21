import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedData, PagingOptions, OrderingOptions } from '../models';

export abstract class ApiService<T, TKey = number> {
  protected readonly http = inject(HttpClient);
  protected abstract readonly baseUrl: string;

  getAll(
    pagingOptions?: PagingOptions,
    orderingOptions?: OrderingOptions
  ): Observable<PagedData<T>> {
    let params = new HttpParams();
    if (pagingOptions) {
      params = params
        .set('pageSize', pagingOptions.pageSize.toString())
        .set('pageNumber', pagingOptions.pageNumber.toString());
    }
    if (orderingOptions) {
      params = params
        .set('orderingOptions.property', orderingOptions.property)
        .set('orderingOptions.direction', orderingOptions.direction);
    }
    return this.http.get<PagedData<T>>(this.baseUrl, { params });
  }

  get(key: TKey): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${key}`);
  }

  add(item: Partial<T>): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  update(key: TKey, item: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${key}`, item);
  }

  delete(key: TKey): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}/${key}`);
  }
}