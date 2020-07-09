import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CrudService } from '@core/models/crud-service.interface';
import { MedicalTransaction } from '@core/models/medical-transaction.model';
import { PagedData } from '@core/models/paged-data.model';
import { environment } from '@env/environment';
import { FetchSingleMedicalTransactionParams } from '@medical/store/medical-transaction.actions';

export interface IMedicalTransactionService
  extends CrudService<
    MedicalTransaction,
    number,
    FetchSingleMedicalTransactionParams
  > {}

@Injectable()
export class MedicalTransactionService implements IMedicalTransactionService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = `${baseUrl}medicalTransactions`;
  }

  public getAll(
    animalId: number = 0,
    pageNumber: number = 0,
    pageSize: number = environment.pageSize
  ): Observable<PagedData<MedicalTransaction>> {
    return this.http.get<PagedData<MedicalTransaction>>(
      `${this.apiUrl}/${animalId}`,
      {
        params: {
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString(),
        },
      }
    );
  }

  public get(
    payload: FetchSingleMedicalTransactionParams
  ): Observable<MedicalTransaction> {
    return this.http.get<MedicalTransaction>(
      `${this.apiUrl}/${payload.animalId}/${payload.id}`
    );
  }

  public add(
    medicalTransaction: MedicalTransaction
  ): Observable<MedicalTransaction> {
    return this.http.post<MedicalTransaction>(this.apiUrl, medicalTransaction);
  }

  public update(
    medicalTransaction: MedicalTransaction
  ): Observable<MedicalTransaction> {
    return this.http.put<MedicalTransaction>(
      `${this.apiUrl}/${medicalTransaction.id}`,
      medicalTransaction
    );
  }

  public delete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${id}`);
  }
}

export class MockMedicalService implements IMedicalTransactionService {
  public getAll(
    animalId: number = 0
  ): Observable<PagedData<MedicalTransaction>> {
    return of({
      data: [],
      currentPage: 0,
      pageCount: 0,
      pageSize: 0,
      totalRecordCount: 0,
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
      unitId: 0,
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
