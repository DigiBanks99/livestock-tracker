import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedingTransaction } from './feeding-transaction.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ILsDataService } from '../shared/ls-grid/ls-data-service.interface';

export interface IFeedingTransactionService {
  get(): Observable<Object>;
}

@Injectable({
  providedIn: 'root'
})
export class FeedingTransactionService implements IFeedingTransactionService, ILsDataService {
  private urlBase = environment.apiUrl + 'FeedingTransaction/';

  constructor(private http: HttpClient) { }

  public get(fetchKey?: any): Observable<Object> {
    return this.http.get(this.urlBase + 'getAll/' + fetchKey);
  }

  public getSingle(fetchKey?: any): Observable<Object> {
    return this.http.get(this.urlBase + 'get/' + fetchKey);
  }

  public add(feedingTransaction: FeedingTransaction): Observable<Object> {
    return this.http.post(this.urlBase, feedingTransaction);
  }

  public delete(feedingTransaction: FeedingTransaction): Observable<Object> {
    return this.http.delete(this.urlBase + feedingTransaction.id);
  }

  public page(pageNumber: number, pageSize: number): Observable<Object> {
    return this.http.get(this.urlBase + 'page?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }
}

export class MockFeedingTransactionService implements IFeedingTransactionService {
  public get(): Observable<Object> {
    return new Observable<Object>();
  }
}
