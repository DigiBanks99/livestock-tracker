import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { PagedData } from '@core/models/paged-data.model';
import { FetchSingleFeedTransactionParams } from '@feed/store/feeding-transaction.actions';

@Injectable()
export class FeedingTransactionService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'feedingTransaction';
  }

  public getAll(
    animalId: number = 0,
    pageNumber: number = 0,
    pageSize: number = 100
  ): Observable<PagedData<FeedingTransaction>> {
    return this.http.get<PagedData<FeedingTransaction>>(
      `${this.apiUrl}/${animalId}`,
      {
        params: {
          pageSize: pageSize.toString(),
          pageNumber: pageNumber.toString()
        }
      }
    );
  }

  public get(
    params: FetchSingleFeedTransactionParams
  ): Observable<FeedingTransaction> {
    return this.getSingle(params);
  }

  public getSingle(
    params: FetchSingleFeedTransactionParams
  ): Observable<FeedingTransaction> {
    return this.http.get<FeedingTransaction>(
      `${this.apiUrl}/${params.animalId}/${params.id}`
    );
  }

  public add(
    feedingTransaction: FeedingTransaction
  ): Observable<FeedingTransaction> {
    return this.http.post<FeedingTransaction>(this.apiUrl, feedingTransaction);
  }

  public replace(
    feedingTransaction: FeedingTransaction
  ): Observable<FeedingTransaction> {
    return this.http.put<FeedingTransaction>(this.apiUrl, feedingTransaction);
  }

  public update(
    feedingTransaction: FeedingTransaction
  ): Observable<FeedingTransaction> {
    return this.http.put<FeedingTransaction>(
      `${this.apiUrl}/${feedingTransaction.id}`,
      feedingTransaction
    );
  }

  public delete(key: number): Observable<number> {
    return this.http.delete<number>(this.apiUrl + key);
  }
}

export class MockFeedingTransactionService {
  public get(): Observable<FeedingTransaction> {
    return of(null);
  }

  public getAll(): Observable<PagedData<FeedingTransaction>> {
    return of({
      data: [],
      currentPage: 0,
      pageCount: 0,
      pageSize: 0,
      totalRecordCount: 0
    });
  }

  public add(
    feedingTransaction: FeedingTransaction
  ): Observable<FeedingTransaction> {
    return of(feedingTransaction);
  }

  public update(
    feedingTransaction: FeedingTransaction
  ): Observable<FeedingTransaction> {
    return of(feedingTransaction);
  }

  public delete(key: number): Observable<number> {
    return of(key);
  }
}
