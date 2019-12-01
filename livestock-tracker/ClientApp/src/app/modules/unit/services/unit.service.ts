import { Observable, of, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Unit } from '@core/models/unit.model';

export interface IUnitService {
  getUnits(): Observable<Unit[]>;
  getUnit(typeCode: number): Observable<Unit>;
  addUnit(unit: Unit): Observable<Unit>;
  updateUnit(unit: Unit): Observable<Unit>;
  deleteUnit(typeCode: number): Observable<number>;
}

@Injectable({
  providedIn: 'root'
})
export class UnitService implements IUnitService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'unit/';
  }

  public getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.apiUrl);
  }

  public getUnit(typeCode: number): Observable<Unit> {
    return this.http.get<Unit>(this.apiUrl + typeCode);
  }

  public addUnit(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(this.apiUrl, unit);
  }

  public updateUnit(unit: Unit): Observable<Unit> {
    return this.http.patch<Unit>(this.apiUrl + unit.typeCode, unit);
  }

  public deleteUnit(typeCode: number): Observable<number> {
    return this.http.delete<number>(this.apiUrl + typeCode);
  }
}

export class MockUnitService implements IUnitService {
  unitsChanged: Subject<Unit[]>;

  constructor() {
    this.unitsChanged = new Subject<Unit[]>();
  }

  getUnits(): Observable<Unit[]> {
    return of([]);
  }
  getUnit(typeCode: number): Observable<Unit> {
    const unit = new Unit();
    unit.typeCode = typeCode;
    return of(unit);
  }
  addUnit(unit: Unit): Observable<Unit> {
    throw new Error('Method not implemented.');
  }
  updateUnit(unit: Unit): Observable<Unit> {
    throw new Error('Method not implemented.');
  }
  deleteUnit(typeCode: number): Observable<number> {
    throw new Error('Method not implemented.');
  }
}
