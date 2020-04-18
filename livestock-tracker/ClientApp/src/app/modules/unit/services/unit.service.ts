import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CrudService } from '@core/models/crud-service.interface';
import { Unit } from '@core/models/unit.model';

@Injectable({
  providedIn: 'root',
})
export class UnitService implements CrudService<Unit, number, Unit[]> {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'unit/';
  }

  public getAll(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.apiUrl);
  }

  public get(key: number): Observable<Unit> {
    return this.http.get<Unit>(this.apiUrl + key);
  }

  public add(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(this.apiUrl, unit);
  }

  public update(unit: Unit): Observable<Unit> {
    return this.http.patch<Unit>(this.apiUrl + unit.id, unit);
  }

  public delete(key: number): Observable<number> {
    return this.http.delete<number>(this.apiUrl + key);
  }
}

export class MockUnitService implements CrudService<Unit, number, Unit[]> {
  getAll(): Observable<Unit[]> {
    return of([]);
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
