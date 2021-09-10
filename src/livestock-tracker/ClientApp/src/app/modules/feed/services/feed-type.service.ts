import { Observable, of, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseUrl } from '@core/di';
import { FeedType, PagedData } from '@core/models';
import { CrudService } from '@core/models/services';

@Injectable()
export class FeedTypeService implements CrudService<FeedType, number, number> {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, @Inject(BaseUrl) baseUrl: string) {
    this.apiUrl = baseUrl + 'feedType';
  }

  public getAll = (
    pageNumber = 0,
    pageSize = 10,
    includeDeleted = false
  ): Observable<PagedData<FeedType>> =>
    this.getFeedTypes(pageNumber, pageSize, includeDeleted);

  public getFeedTypes(
    pageNumber = 0,
    pageSize = 10,
    includeDeleted = false
  ): Observable<PagedData<FeedType>> {
    return this.http.get<PagedData<FeedType>>(this.apiUrl, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        includeDeleted: includeDeleted.toString()
      }
    });
  }

  public get = (key: number): Observable<FeedType> => this.getFromServer(key);

  public getFromServer(id: number): Observable<FeedType> {
    return this.http.get<FeedType>(`${this.apiUrl}/${id}`);
  }

  public add(feedType: FeedType): Observable<FeedType> {
    return this.http.post<FeedType>(this.apiUrl, feedType);
  }

  public update(feedType: FeedType): Observable<FeedType> {
    return this.http.put<FeedType>(`${this.apiUrl}/${feedType.id}`, feedType);
  }

  public delete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${id}`);
  }
}

export class MockFeedTypeService {
  public feedTypesChanged: Subject<FeedType[]>;

  constructor() {
    this.feedTypesChanged = new Subject<FeedType[]>();
  }

  getFeedTypes(): Observable<PagedData<FeedType>> {
    return of({
      data: [],
      currentPage: 0,
      pageCount: 0,
      pageSize: 0,
      totalRecordCount: 0
    });
  }

  getFromServer(id: number): Observable<FeedType> {
    throw new Error('Method not implemented.');
  }
  add(feedType: FeedType): Observable<FeedType> {
    throw new Error('Method not implemented.');
  }
  update(feedType: FeedType): Observable<FeedType> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<number> {
    throw new Error('Method not implemented.');
  }
}
