import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';

import { environment } from '@env/environment';
import { FeedType } from '@feed-type/feed-type.model';

export interface IFeedTypeService {
  getFeedTypes(): Observable<FeedType[]>;
  getFromServer(id: number): Observable<FeedType>;
  add(feedType: FeedType): Observable<FeedType>;
  update(feedType: FeedType): Observable<FeedType>;
  delete(id: number): Observable<number>;
}

@Injectable()
export class FeedTypeService implements IFeedTypeService {
  private urlBase = environment.apiUrl + 'feedtype/';

  constructor(private http: HttpClient) {}

  public getFeedTypes(): Observable<FeedType[]> {
    return this.http.get<FeedType[]>(this.urlBase);
  }

  public getFromServer(id: number): Observable<FeedType> {
    return this.http.get<FeedType>(this.urlBase + id);
  }

  public add(feedType: FeedType): Observable<FeedType> {
    return this.http.post<FeedType>(this.urlBase, feedType);
  }

  public update(feedType: FeedType): Observable<FeedType> {
    return this.http.put<FeedType>(this.urlBase + feedType.id, feedType);
  }

  public delete(id: number): Observable<number> {
    return this.http.delete<number>(this.urlBase + id);
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
