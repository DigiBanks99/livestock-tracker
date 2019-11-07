import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedingTransaction } from './feeding-transaction.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ILsDataService } from '@shared/ls-grid/ls-data-service.interface';

export interface IFeedingTransactionService {
  get(): Observable<Object>;
}

@Injectable()
export class FeedingTransactionService
  implements IFeedingTransactionService, ILsDataService {
  private urlBase = environment.apiUrl + 'feedingTransaction/';

  constructor(private http: HttpClient) {}

  public get(fetchKey?: any): Observable<Object> {
    return this.http.get<FeedingTransaction[]>(
      this.urlBase + 'getAll/' + fetchKey
    );
  }

  public getSingle(fetchKey?: any): Observable<Object> {
    return this.http.get<FeedingTransaction>(this.urlBase + 'get/' + fetchKey);
  }

  public add(feedingTransaction: FeedingTransaction): Observable<Object> {
    return this.http.post<FeedingTransaction>(this.urlBase, feedingTransaction);
  }

  public replace(feedingTransaction: FeedingTransaction): Observable<Object> {
    return this.http.put<FeedingTransaction>(this.urlBase, feedingTransaction);
  }

  public patch(feedingTransaction: FeedingTransaction): Observable<Object> {
    return this.http.patch<FeedingTransaction>(
      this.urlBase,
      feedingTransaction
    );
  }

  public delete(feedingTransaction: FeedingTransaction): Observable<Object> {
    return this.deleteById(feedingTransaction.id);
  }

  public deleteById(id: number): Observable<Object> {
    return this.http.delete<number>(this.urlBase + id);
  }

  public page(pageNumber: number, pageSize: number): Observable<Object> {
    return this.http.get(
      this.urlBase + 'page?pageNumber=' + pageNumber + '&pageSize=' + pageSize
    );
  }
}

export class MockFeedingTransactionService
  implements IFeedingTransactionService {
  public get(): Observable<Object> {
    return new Observable<Object>();
  }
}
