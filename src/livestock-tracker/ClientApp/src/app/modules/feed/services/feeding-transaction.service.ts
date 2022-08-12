import {
  Observable,
  of
} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BaseUrl } from '@core/di/base-url.injection-token';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { PagedData } from '@core/models/paged-data.model';
import { AnimalTransactionService } from '@core/models/services';
import { FetchSingleFeedTransactionParams } from '@feed/store/feeding-transaction.actions';

@Injectable()
export class FeedingTransactionService
  implements AnimalTransactionService<FeedingTransaction>
{
  private readonly _url: string;

  constructor(private _http: HttpClient, @Inject(BaseUrl) baseUrl: string) {
    this._url = baseUrl + 'FeedingTransaction';
  }

  public getAll(
    animalId: number = 0,
    pageNumber: number = 0,
    pageSize: number = 100
  ): Observable<PagedData<FeedingTransaction>> {
    return this._http.get<PagedData<FeedingTransaction>>(
      `${this._url}/${animalId}`,
      {
        params: {
          pageSize: pageSize.toString(),
          pageNumber: pageNumber.toString()
        }
      }
    );
  }

  /**
   * Fetches a paged collection of the weight transactions for the specified animal.
   *
   * @param animalId The animal for which the transactions should be returned.
   * @param paginationParameters The parameters for retrieving the correct pagination data.
   * @returns A paged collection of weight transactions.
   */
  public getAnimalTransactions(
    animalId: number,
    paginationParameters: PageEvent
  ): Observable<PagedData<FeedingTransaction>> {
    return this._http.get<PagedData<FeedingTransaction>>(`${this._url}`, {
      params: {
        animalIds: [String(animalId)],
        pageSize: paginationParameters.pageSize.toString(),
        pageNumber: paginationParameters.pageIndex.toString()
      }
    });
  }

  public get(
    params: FetchSingleFeedTransactionParams
  ): Observable<FeedingTransaction> {
    return this.getSingle(params);
  }

  public getSingle(
    params: FetchSingleFeedTransactionParams
  ): Observable<FeedingTransaction> {
    return this._http.get<FeedingTransaction>(
      `${this._url}/${params.animalId}/${params.id}`
    );
  }

  public add(
    feedingTransaction: FeedingTransaction
  ): Observable<FeedingTransaction> {
    return this._http.post<FeedingTransaction>(this._url, feedingTransaction);
  }

  public replace(
    feedingTransaction: FeedingTransaction
  ): Observable<FeedingTransaction> {
    return this._http.put<FeedingTransaction>(this._url, feedingTransaction);
  }

  public update(
    feedingTransaction: FeedingTransaction
  ): Observable<FeedingTransaction> {
    return this._http.put<FeedingTransaction>(
      `${this._url}/${feedingTransaction.id}`,
      feedingTransaction
    );
  }

  public delete(key: number): Observable<number> {
    return this._http.delete<number>(this._url + key);
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
