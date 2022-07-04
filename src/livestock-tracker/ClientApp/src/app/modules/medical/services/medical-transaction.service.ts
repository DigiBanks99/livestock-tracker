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
import { MedicalTransaction } from '@core/models';
import { PagedData } from '@core/models/paged-data.model';
import { AnimalTransactionService } from '@core/models/services';
import { environment } from '@env/environment';
import { FetchSingleMedicalTransactionParams } from '@medical/store/medical-transaction.actions';

@Injectable()
export class MedicalTransactionService
  implements AnimalTransactionService<MedicalTransaction>
{
  private readonly _url: string;

  constructor(
    private readonly _http: HttpClient,
    @Inject(BaseUrl) baseUrl: string
  ) {
    this._url = `${baseUrl}MedicalTransactions`;
  }

  public getAll(
    animalId: number = 0,
    pageNumber: number = 0,
    pageSize: number = environment.pageSize
  ): Observable<PagedData<MedicalTransaction>> {
    return this._http.get<PagedData<MedicalTransaction>>(
      `${this._url}/${animalId}`,
      {
        params: {
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString()
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
  ): Observable<PagedData<MedicalTransaction>> {
    return this._http.get<PagedData<MedicalTransaction>>(`${this._url}`, {
      params: {
        animalIds: [String(animalId)],
        pageSize: paginationParameters.pageSize.toString(),
        pageNumber: paginationParameters.pageIndex.toString()
      }
    });
  }

  public get(
    payload: FetchSingleMedicalTransactionParams
  ): Observable<MedicalTransaction> {
    return this._http.get<MedicalTransaction>(
      `${this._url}/${payload.animalId}/${payload.id}`
    );
  }

  public add(
    medicalTransaction: MedicalTransaction
  ): Observable<MedicalTransaction> {
    return this._http.post<MedicalTransaction>(this._url, medicalTransaction);
  }

  public update(
    medicalTransaction: MedicalTransaction
  ): Observable<MedicalTransaction> {
    return this._http.put<MedicalTransaction>(
      `${this._url}/${medicalTransaction.id}`,
      medicalTransaction
    );
  }

  public delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this._url}/${id}`);
  }
}

export class MockMedicalService {
  public getAll(
    animalId: number = 0
  ): Observable<PagedData<MedicalTransaction>> {
    return of({
      data: [],
      currentPage: 0,
      pageCount: 0,
      pageSize: 0,
      totalRecordCount: 0
    });
  }

  public get(
    payload: FetchSingleMedicalTransactionParams
  ): Observable<MedicalTransaction> {
    return of({
      animalId: 0,
      dose: 0,
      id: 0,
      medicineId: 0,
      transactionDate: new Date(),
      unitId: 0
    });
  }

  public add(
    medicalTransaction: MedicalTransaction
  ): Observable<MedicalTransaction> {
    return of(medicalTransaction);
  }

  public update(
    medicalTransaction: MedicalTransaction
  ): Observable<MedicalTransaction> {
    return of(medicalTransaction);
  }

  public delete(id: number): Observable<number> {
    return of(id);
  }
}
