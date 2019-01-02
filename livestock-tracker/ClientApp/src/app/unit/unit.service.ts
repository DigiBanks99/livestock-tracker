import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { Unit } from './unit.model';
import { environment } from '@env/environment';

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
  private urlBase = environment.apiUrl + 'unit/';

  constructor(private http: HttpClient) {}

  public getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.urlBase);
  }

  public getUnit(typeCode: number): Observable<Unit> {
    return this.http.get<Unit>(this.urlBase + typeCode);
  }

  public addUnit(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(this.urlBase, unit);
  }

  public updateUnit(unit: Unit): Observable<Unit> {
    return this.http.patch<Unit>(this.urlBase + unit.typeCode, unit);
  }

  public deleteUnit(typeCode: number): Observable<number> {
    return this.http.delete<number>(this.urlBase + typeCode);
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
