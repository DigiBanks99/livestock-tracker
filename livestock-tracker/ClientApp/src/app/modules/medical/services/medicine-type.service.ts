import { Observable, of, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CrudService } from '@core/models/crud-service.interface';
import { MedicineType } from '@core/models/medicine-type.model';
import { PagedData } from '@core/models/paged-data.model';

export interface IMedicineTypeService
  extends CrudService<MedicineType, number, number> {}

@Injectable()
export class MedicineTypeService implements IMedicineTypeService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = `${baseUrl}medicineType`;
  }

  public getAll(
    pageNumber: number = 0,
    pageSize: number = 100,
    includeDeleted: boolean = false
  ): Observable<PagedData<MedicineType>> {
    return this.http.get<PagedData<MedicineType>>(this.apiUrl, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        includeDeleted: includeDeleted.toString(),
      },
    });
  }

  public get(key: number): Observable<MedicineType> {
    return this.http.get<MedicineType>(`${this.apiUrl}/${key}`);
  }

  public add(medicineType: MedicineType): Observable<MedicineType> {
    return this.http.post<MedicineType>(this.apiUrl, medicineType);
  }

  public delete(key: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${key}`);
  }

  public update(medicineTypeToUpdate: MedicineType): Observable<MedicineType> {
    return this.http.put<MedicineType>(
      `${this.apiUrl}/${medicineTypeToUpdate.id}`,
      medicineTypeToUpdate
    );
  }
}

export class MockMedicineTypeService implements IMedicineTypeService {
  public getAll(): Observable<PagedData<MedicineType>> {
    return of({
      data: [],
      currentPage: 0,
      pageCount: 0,
      pageSize: 0,
      totalRecordCount: 0,
    });
  }

  public get(key: number): Observable<MedicineType> {
    return of({
      id: key,
      description: 'Existing',
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
