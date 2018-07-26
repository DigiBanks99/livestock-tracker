import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { environment } from '../../environments/environment';
import { FeedType } from './feed-type.model';

export interface IFeedTypeService {
  feedTypesChanged: Subject<FeedType[]>;

  getFeedTypes();
  getFromServer(id: number): Observable<Object>;
  get(id: number): FeedType;
  add(feedType: FeedType);
  update(feedType: FeedType);
  delete(id: number);
}

@Injectable()
export class FeedTypeService implements IFeedTypeService, OnInit, OnDestroy {
  private urlBase = environment.apiUrl + 'feedtype/';
  private feedTypes: FeedType[];

  public feedTypesChanged: Subject<FeedType[]>;
  constructor(private http: HttpClient) {
    this.feedTypes = [];
    this.feedTypesChanged = new Subject<FeedType[]>();
  }

  ngOnInit() {

  }

  public getFeedTypes() {
    this.http.get(this.urlBase).subscribe((feedTypes: FeedType[]) => {
      this.feedTypes = feedTypes;
      this.emitFeedTypesChanged();
    });
  }

  public getFromServer(id: number): Observable<Object> {
    return this.http.get(this.urlBase + id);
  }

  public get(id: number): FeedType {
    if (isNullOrUndefined(this.feedTypes)) {
      return new FeedType();
    }

    const index = this.feedTypes.map((feedType: FeedType) => {
      return feedType.id;
    }).indexOf(id);

    if (index < 0) {
      throw new Error('Index out of range');
    }

    return this.feedTypes.slice()[index];
  }

  public add(feedType: FeedType) {
    this.http.post(this.urlBase, feedType).subscribe((savedFeedType: FeedType) => {
      this.feedTypes.push(savedFeedType);
      this.emitFeedTypesChanged();
    });
  }

  public update(feedType: FeedType) {
    this.http.put(this.urlBase + feedType.id, feedType).subscribe(() => {
      this.emitFeedTypesChanged();
    });
  }

  public delete(id: number) {
    this.http.delete(this.urlBase + id).subscribe(() => {
      this.getFeedTypes();
    });
  }

  private emitFeedTypesChanged() {
    this.feedTypesChanged.next(this.feedTypes.slice());
  }

  ngOnDestroy() {
    this.feedTypesChanged.unsubscribe();
  }
}

export class MockFeedTypeService implements IFeedTypeService {
  public feedTypesChanged: Subject<FeedType[]>;

  constructor() {
    this.feedTypesChanged = new Subject<FeedType[]>();
  }

  getFeedTypes() {
    this.feedTypesChanged.next([]);
  }

  getFromServer(id: number): Observable<Object> {
    throw new Error('Method not implemented.');
  }
  get(id: number): FeedType {
    throw new Error('Method not implemented.');
  }
  add(feedType: FeedType) {
    throw new Error('Method not implemented.');
  }
  update(feedType: FeedType) {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
