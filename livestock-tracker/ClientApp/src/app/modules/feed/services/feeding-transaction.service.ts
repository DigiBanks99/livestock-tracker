import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CrudService } from '@core/models/crud-service.interface';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { AppState } from '@core/store';
import { getSelectedAnimalId } from '@core/store/selectors';
import { FetchSingleFeedTransactionParams } from '@feed/store/feeding-transaction.actions';
import { select, Store } from '@ngrx/store';

export interface IFeedingTransactionService
  extends CrudService<
    FeedingTransaction,
    number,
    FeedingTransaction[],
    FetchSingleFeedTransactionParams
  > {}

@Injectable()
export class FeedingTransactionService implements IFeedingTransactionService {
  private readonly apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private store: Store<AppState>
  ) {
    this.apiUrl = baseUrl + 'feedingTransaction/';
  }

  public getAll(): Observable<FeedingTransaction[]> {
    return this.store.pipe(
      select(getSelectedAnimalId),
      switchMap((animalId: number) =>
        this.http.get<FeedingTransaction[]>(`${this.apiUrl}${animalId}`)
      )
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
      `${this.apiUrl}${params.animalId}/${params.id}`
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
    return this.http.patch<FeedingTransaction>(this.apiUrl, feedingTransaction);
  }

  public delete(key: number): Observable<number> {
    return this.http.delete<number>(this.apiUrl + key);
  }

  public page(
    pageNumber: number,
    pageSize: number
  ): Observable<FeedingTransaction> {
    return this.http.get<FeedingTransaction>(
      this.apiUrl + 'page?pageNumber=' + pageNumber + '&pageSize=' + pageSize
    );
  }
}

export class MockFeedingTransactionService
  implements IFeedingTransactionService {
  public get(): Observable<FeedingTransaction> {
    return of(null);
  }

  public getAll(): Observable<FeedingTransaction[]> {
    return of([]);
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
