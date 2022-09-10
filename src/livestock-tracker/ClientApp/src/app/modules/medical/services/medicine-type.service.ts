import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicineType } from '@core/models/medicine-type.model';
import { PagedData } from '@core/models/paged-data.model';

@Injectable()
export class MedicineTypeService {
  private readonly _apiUrl: string;

  constructor(private http: HttpClient) {
    this._apiUrl = `/api/medicineType`;
  }

  public getAll(
    pageNumber: number = 0,
    pageSize: number = 100,
    includeDeleted: boolean = false
  ): Observable<PagedData<MedicineType>> {
    return this.http.get<PagedData<MedicineType>>(this._apiUrl, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        includeDeleted: includeDeleted.toString()
      }
    });
  }

  public get(key: number): Observable<MedicineType> {
    return this.http.get<MedicineType>(`${this._apiUrl}/${key}`);
  }

  public add(medicineType: MedicineType): Observable<MedicineType> {
    return this.http.post<MedicineType>(this._apiUrl, medicineType);
  }

  public delete(key: number): Observable<number> {
    return this.http.delete<number>(`${this._apiUrl}/${key}`);
  }

  public update(medicineTypeToUpdate: MedicineType): Observable<MedicineType> {
    return this.http.put<MedicineType>(
      `${this._apiUrl}/${medicineTypeToUpdate.id}`,
      medicineTypeToUpdate
    );
  }
}

export class MockMedicineTypeService {
  public getAll(): Observable<PagedData<MedicineType>> {
    return of({
      data: [],
      currentPage: 0,
      pageCount: 0,
      pageSize: 0,
      totalRecordCount: 0
    });
  }

  public get(key: number): Observable<MedicineType> {
    return of({
      id: key,
      description: 'Existing'
    });
  }

  public add(medicineType: MedicineType): Observable<MedicineType> {
    return of(medicineType);
  }

  delete(key: number): Observable<number> {
    return of(key);
  }

  update(medicineTypeToUpdate: MedicineType): Observable<MedicineType> {
    return of(medicineTypeToUpdate);
  }
}
