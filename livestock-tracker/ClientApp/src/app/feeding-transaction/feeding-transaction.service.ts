import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { FeedingTransaction } from './feeding-transaction.model';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { environment } from '../../environments/environment';

export interface IFeedingTransactionService {
  get(): Observable<Object>;
}

@Injectable({
  providedIn: 'root'
})
export class FeedingTransactionService implements IFeedingTransactionService {
  private urlBase = environment.apiUrl + 'FeedingTransaction/';

  constructor(private http: HttpClient) { }

  public get(): Observable<Object> {
    return this.http.get(this.urlBase);
  }
}

export class MockFeedingTransactionService implements IFeedingTransactionService {
  public get(): Observable<Object> {
    return new Observable<Object>();
  }
}
