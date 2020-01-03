import { Observable, of, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CrudService } from '@core/models/crud-service.interface';
import { FeedType } from '@core/models/feed-type.model';

export interface IFeedTypeService {
  getFeedTypes(): Observable<FeedType[]>;
  getFromServer(id: number): Observable<FeedType>;
  add(feedType: FeedType): Observable<FeedType>;
  update(feedType: FeedType): Observable<FeedType>;
  delete(id: number): Observable<number>;
}

@Injectable()
export class FeedTypeService
  implements IFeedTypeService, CrudService<FeedType, number> {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'feedType/';
  }

  public getAll = (): Observable<FeedType[]> => this.getFeedTypes();

  public getFeedTypes(): Observable<FeedType[]> {
    return this.http.get<FeedType[]>(this.apiUrl);
  }

  public get = (key: number): Observable<FeedType> => this.getFromServer(key);

  public getFromServer(id: number): Observable<FeedType> {
    return this.http.get<FeedType>(this.apiUrl + id);
  }

  public add(feedType: FeedType): Observable<FeedType> {
    return this.http.post<FeedType>(this.apiUrl, feedType);
  }

  public update(feedType: FeedType): Observable<FeedType> {
    return this.http.patch<FeedType>(this.apiUrl + feedType.id, feedType);
  }

  public delete(id: number): Observable<number> {
    return this.http.delete<number>(this.apiUrl + id);
  }
}

export class MockFeedTypeService implements IFeedTypeService {
  public feedTypesChanged: Subject<FeedType[]>;

  constructor() {
    this.feedTypesChanged = new Subject<FeedType[]>();
  }

  getFeedTypes(): Observable<FeedType[]> {
    return of([]);
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
