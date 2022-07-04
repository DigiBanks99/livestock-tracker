import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BaseUrl } from '@core/di';
import { PagedData } from '@core/models';
import { AnimalTransactionService } from '@core/models/services';
import { WeightTransaction } from '@weight/interfaces';
import { WeightProviderModule } from '@weight/weight-provider.module';

@Injectable({
  providedIn: WeightProviderModule
})
export class WeightService
  implements AnimalTransactionService<WeightTransaction>
{
  private readonly _url: string;

  constructor(
    private readonly _http: HttpClient,
    @Inject(BaseUrl) baseUrl: string
  ) {
    this._url = `${baseUrl}Weight`;
  }

  public getAll(): Observable<PagedData<WeightTransaction>> {
    return this._http.get<PagedData<WeightTransaction>>(this._url);
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
  ): Observable<PagedData<WeightTransaction>> {
    return this._http.get<PagedData<WeightTransaction>>(`${this._url}`, {
      params: {
        animalIds: [String(animalId)],
        pageSize: paginationParameters.pageSize.toString(),
        pageNumber: paginationParameters.pageIndex.toString()
      }
    });
  }

  public get(key: WeightTransaction): Observable<WeightTransaction> {
    return this._http.get<WeightTransaction>(`${this._url}/${key}`);
  }

  public add(item: WeightTransaction): Observable<WeightTransaction> {
    return this._http.post<WeightTransaction>(this._url, item);
  }

  public update(
    item: WeightTransaction,
    key: number
  ): Observable<WeightTransaction> {
    return this._http.put<WeightTransaction>(`${this._url}/${key}`, item);
  }

  public delete(key: number): Observable<number> {
    return this._http.delete<number>(`${this._url}/${key}`);
  }
}
