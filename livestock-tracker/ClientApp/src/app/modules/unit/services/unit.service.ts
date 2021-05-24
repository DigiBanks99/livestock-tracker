import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseUrl } from '@core/di';
import { PagedData, Unit } from '@core/models';
import { CrudService } from '@core/models/services';

@Injectable({
  providedIn: 'root'
})
export class UnitService implements CrudService<Unit, number, number> {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, @Inject(BaseUrl) baseUrl: string) {
    this.apiUrl = baseUrl + 'unit';
  }

  public getAll(
    pageNumber: number = 0,
    pageSize: number = 10,
    includeDeleted: boolean = false
  ): Observable<PagedData<Unit>> {
    return this.http.get<PagedData<Unit>>(this.apiUrl, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        includeDeleted: includeDeleted.toString()
      }
    });
  }

  public get(key: number): Observable<Unit> {
    return this.http.get<Unit>(`${this.apiUrl}/${key}`);
  }

  public add(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(this.apiUrl, unit);
  }

  public update(unit: Unit): Observable<Unit> {
    return this.http.put<Unit>(`${this.apiUrl}/${unit.id}`, unit);
  }

  public delete(key: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${key}`);
  }
}

export class MockUnitService implements CrudService<Unit, number, number> {
  getAll(): Observable<PagedData<Unit>> {
    return of({
      data: [],
      currentPage: 0,
      pageCount: 0,
      pageSize: 0,
      totalRecordCount: 0
    });
  }
  get(key: number): Observable<Unit> {
    const unit = new Unit();
    unit.id = key;
    return of(unit);
  }
  add(unit: Unit): Observable<Unit> {
    throw new Error('Method not implemented.');
  }
  update(unit: Unit): Observable<Unit> {
    throw new Error('Method not implemented.');
  }
  delete(key: number): Observable<number> {
    throw new Error('Method not implemented.');
  }
}
